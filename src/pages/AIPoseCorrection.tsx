import { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RefreshCw, CheckCircle2, AlertCircle, Activity, Camera } from 'lucide-react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';

const AIPoseCorrection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const detector = useRef<poseDetection.PoseDetector | null>(null);
    const prevKeypointsRef = useRef<poseDetection.Keypoint[] | null>(null);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [accuracy, setAccuracy] = useState(0);
    const [feedback, setFeedback] = useState('Initializing Neural Network...');

    useEffect(() => {
        const initAI = async () => {
            try {
                // Initialize TensorFlow.js backend
                await tf.setBackend('webgl');
                await tf.ready();

                // Load MoveNet model
                const model = poseDetection.SupportedModels.MoveNet;
                const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
                const loadedDetector = await poseDetection.createDetector(model, detectorConfig);
                detector.current = loadedDetector;

                setStatus('ready');
                setFeedback('Waiting for camera stream...');
                startCamera();
            } catch (err) {
                console.error('TFJS Error:', err);
                setStatus('error');
                setFeedback('Failed to load AI model. Hardware acceleration required.');
            }
        };

        initAI();
    }, []);

    const startCamera = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setStatus('error');
            setFeedback('Camera API not available in this browser.');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, facingMode: 'user' }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play();
                    setFeedback('Align your body in frame');
                    detectPose();
                };
            }
        } catch (err) {
            console.error('Camera Error:', err);
            setStatus('error');
            setFeedback('Camera permission denied.');
        }
    };

    const detectPose = async () => {
        if (!detector.current || !videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const loop = async () => {
            if (!video.paused && !video.ended) {

                const poses = await detector.current!.estimatePoses(video);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                if (poses.length > 0) {
                    let keypoints = poses[0].keypoints;

                    // Apply Smoothing (Exponential Moving Average)
                    if (prevKeypointsRef.current) {
                        const smoothingFactor = 0.5;
                        keypoints = keypoints.map((kp, index) => {
                            const prevKp = prevKeypointsRef.current![index];
                            return {
                                ...kp,
                                x: prevKp.x * smoothingFactor + kp.x * (1 - smoothingFactor),
                                y: prevKp.y * smoothingFactor + kp.y * (1 - smoothingFactor),
                                score: (prevKp.score || 0) * smoothingFactor + (kp.score || 0) * (1 - smoothingFactor)
                            };
                        });
                    }
                    prevKeypointsRef.current = keypoints;

                    drawSkeleton(keypoints, ctx);
                    drawAngles(keypoints, ctx);

                    // Simple logic for "accuracy" based on score of detected keypoints
                    const avgScore = keypoints.reduce((acc: number, kp: poseDetection.Keypoint) => acc + (kp.score || 0), 0) / keypoints.length;
                    setAccuracy(Math.round(avgScore * 100));

                    if (avgScore > 0.5) {
                        setFeedback('Tracking Active - Maintain Form');
                    } else {
                        setFeedback('Low Visibility - Adjust Lighting');
                    }
                } else {
                    prevKeypointsRef.current = null;
                }

                requestAnimationFrame(loop);
            }
        };
        loop();
    };

    const calculateAngle = (a: poseDetection.Keypoint, b: poseDetection.Keypoint, c: poseDetection.Keypoint) => {
        const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
        let angle = Math.abs(radians * 180.0 / Math.PI);
        if (angle > 180.0) angle = 360 - angle;
        return Math.round(angle);
    };

    const drawAngles = (keypoints: poseDetection.Keypoint[], ctx: CanvasRenderingContext2D) => {
        // Indicies for MoveNet Lightning:
        // 5: Left Shoulder, 7: Left Elbow, 9: Left Wrist
        // 6: Right Shoulder, 8: Right Elbow, 10: Right Wrist
        // 11: Left Hip, 13: Left Knee, 15: Left Ankle
        // 12: Right Hip, 14: Right Knee, 16: Right Ankle

        const joints = [
            { name: 'Left Elbow', points: [5, 7, 9] },
            { name: 'Right Elbow', points: [6, 8, 10] },
            { name: 'Left Knee', points: [11, 13, 15] },
            { name: 'Right Knee', points: [12, 14, 16] },
        ];

        joints.forEach(joint => {
            const a = keypoints[joint.points[0]];
            const b = keypoints[joint.points[1]]; // The vertex
            const c = keypoints[joint.points[2]];

            if ((a.score || 0) > 0.3 && (b.score || 0) > 0.3 && (c.score || 0) > 0.3) {
                const angle = calculateAngle(a, b, c);

                // Draw Angle Text
                ctx.font = '900 16px "Inter", sans-serif';
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 3;
                ctx.strokeText(`${angle}°`, b.x + 10, b.y);
                ctx.fillText(`${angle}°`, b.x + 10, b.y);
            }
        });
    }

    const drawSkeleton = (keypoints: poseDetection.Keypoint[], ctx: CanvasRenderingContext2D) => {
        // Draw Points
        keypoints.forEach((kp) => {
            if ((kp.score || 0) > 0.3) {
                ctx.beginPath();
                ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = '#10b981'; // emerald-500
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.stroke();
            }
        });

        // Define connections (skeleton)
        const connections = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.MoveNet);

        connections.forEach(([i, j]) => {
            const kp1 = keypoints[i];
            const kp2 = keypoints[j];

            if ((kp1.score || 0) > 0.3 && (kp2.score || 0) > 0.3) {
                ctx.beginPath();
                ctx.moveTo(kp1.x, kp1.y);
                ctx.lineTo(kp2.x, kp2.y);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.stroke();
            }
        });
    };


    return (
        <div className="space-y-8 max-w-6xl mx-auto min-h-[80vh] flex flex-col pt-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">AI Pose Correction</h2>
                    <p className="text-slate-400 font-medium">Precision form analysis for crew-specific routines</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 text-[10px] font-black uppercase tracking-widest border-white/10" onClick={() => startCamera()}>
                        <RefreshCw className="w-3 h-3" /> Retry Camera
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8 flex-1">
                {/* Main Camera View */}
                <div className="lg:col-span-3 relative bg-slate-900 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl min-h-[500px] flex items-center justify-center">

                    {/* Hidden Video Feed for AI Processing */}
                    <video ref={videoRef} className="hidden" playsInline muted />

                    {/* Canvas for Displaying Input + Skeleton */}
                    <canvas ref={canvasRef} className="w-full h-full object-cover" />

                    {status === 'loading' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-20">
                            <div className="flex flex-col items-center gap-4">
                                <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin" />
                                <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Booting Neural Engine...</p>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-20">
                            <div className="flex flex-col items-center gap-4 text-center p-8">
                                <AlertCircle className="w-12 h-12 text-rose-500" />
                                <p className="text-lg font-black text-rose-500 uppercase italic">System Failure</p>
                                <p className="text-xs text-slate-400 max-w-xs">{feedback}</p>
                            </div>
                        </div>
                    )}

                    {/* Floating Metrics */}
                    <div className="absolute top-8 left-8 space-y-3 z-10 pointer-events-none">
                        <div className="bg-slate-950/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl">
                            <Activity className="w-5 h-5 text-emerald-400" />
                            <div>
                                <span className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">Neural Status</span>
                                <span className="text-xs font-black text-white uppercase tracking-tighter">Live Biometrics</span>
                            </div>
                        </div>
                        <div className="bg-slate-950/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl">
                            <div className={`w-2.5 h-2.5 rounded-full ${accuracy > 50 ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
                            <div>
                                <span className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">Confidence</span>
                                <span className="text-xs font-black text-white uppercase tracking-tighter">{accuracy}% Alignment</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Feedback Bar */}
                    <div className="absolute bottom-8 left-8 right-8 z-10">
                        <Card className={`p-6 bg-slate-950/90 backdrop-blur-md border-white/10 flex items-center gap-6 shadow-2xl overflow-hidden`} hover={false}>
                            {status === 'ready' ? (
                                <Activity className="w-8 h-8 text-emerald-400 animate-pulse" />
                            ) : (
                                <Camera className="w-8 h-8 text-slate-500" />
                            )}
                            <div className="flex-1">
                                <h4 className={`text-xs font-black uppercase tracking-widest text-slate-500`}>
                                    AI Guidance System
                                </h4>
                                <p className={`text-xl font-black italic tracking-tight text-white`}>
                                    {feedback}
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-3">Session Metrics</h3>
                        <Card className="p-6 space-y-6 bg-slate-900 shadow-xl" hover={false}>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Stability Index</span>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[92%]" style={{ width: `${accuracy}%` }} />
                                        </div>
                                        <span className="text-xs font-black text-white italic">{accuracy}%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Latency</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-black text-slate-400 italic">~15ms (WebGL)</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-500 pl-3">Actions</h3>
                        <div className="flex flex-col gap-3">
                            <Button variant="outline" className="w-full gap-3 font-black uppercase tracking-widest py-4 border-white/10 group" onClick={() => startCamera()}>
                                <RefreshCw className="w-5 h-5 text-slate-500 group-hover:rotate-180 transition-transform duration-500" />
                                Reset Camera
                            </Button>
                            <Button className="w-full gap-3 font-black uppercase tracking-widest py-4 shadow-xl">
                                <CheckCircle2 className="w-5 h-5" />
                                Save Session
                            </Button>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 space-y-2">
                        <div className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                            Privacy Notice
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            All video processing is performed locally on your device via TensorFlow.js. No footage is uploaded to the cloud.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIPoseCorrection;
