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
        // Attempt to access camera API in any way possible
        // Note: Modern browsers block this on insecure origins (HTTP), but we allow the attempt if the user insists.

        const tryGetStream = async (constraints: MediaStreamConstraints) => {
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    return await navigator.mediaDevices.getUserMedia(constraints);
                }
                return null;
            } catch (e) {
                return null;
            }
        };

        try {
            // 1. Try ideal mobile constraints (user facing, 480p)
            let stream = await tryGetStream({
                video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
            });

            // 2. Fallback: Any camera, any resolution
            if (!stream) {
                console.warn('Ideal camera constraints failed, trying fallback...');
                stream = await tryGetStream({ video: true });
            }

            // 3. Last ditch effort: Legacy APIs (Unlikely to work in 2025 but harmless to try)
            if (!stream) {
                const legacyGum = (navigator as any).getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia;
                if (legacyGum) {
                    stream = await new Promise<MediaStream>((resolve) => {
                        legacyGum.call(navigator, { video: true }, resolve, () => resolve(null as any));
                    });
                }
            }

            if (!stream) {
                // Even if it failed, we don't block. We just show a generic error.
                throw new Error('No stream available');
            }

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Add playsinline attribute enforcement for iOS
                videoRef.current.setAttribute('playsinline', 'true');

                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play().catch(e => console.error("Play error:", e));
                    setFeedback('Align your body in frame');
                    detectPose();
                };
            }
        } catch (err: any) {
            console.error('Camera Error:', err);
            setStatus('error');

            if (!window.isSecureContext) {
                setFeedback('Browser blocked camera on insecure connection.');
            } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setFeedback('Permission denied. Please allow camera access.');
            } else {
                setFeedback('Camera initialization failed.');
            }
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
        <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto min-h-[80vh] flex flex-col pt-4 md:pt-8 pb-20 md:pb-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4 md:px-0">
                <div className="space-y-1 md:space-y-2">
                    <h2 className="text-2xl md:text-5xl font-black italic tracking-tighter uppercase">AI Pose Correction</h2>
                    <p className="text-sm md:text-base text-slate-400 font-medium">Precision form analysis for crew-specific routines</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 text-[10px] font-black uppercase tracking-widest border-white/10 w-full md:w-auto" onClick={() => startCamera()}>
                        <RefreshCw className="w-3 h-3" /> Retry Camera
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 md:gap-8 flex-1 px-4 md:px-0">
                {/* Main Camera View */}
                <div className="lg:col-span-3 relative bg-slate-900 rounded-2xl md:rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl h-[50vh] md:h-[600px] flex items-center justify-center">

                    {/* Hidden Video Feed for AI Processing */}
                    <video ref={videoRef} className="hidden" playsInline muted />

                    {/* Canvas for Displaying Input + Skeleton */}
                    <canvas ref={canvasRef} className="w-full h-full object-cover" />

                    {status === 'loading' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-20">
                            <div className="flex flex-col items-center gap-4">
                                <RefreshCw className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 animate-spin" />
                                <p className="text-[10px] md:text-xs font-black text-slate-300 uppercase tracking-widest">Booting Neural Engine...</p>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-20">
                            <div className="flex flex-col items-center gap-4 text-center p-8">
                                <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-rose-500" />
                                <p className="text-base md:text-lg font-black text-rose-500 uppercase italic">Connection Error</p>
                                <p className="text-[10px] md:text-xs text-slate-400 max-w-xs">{feedback}</p>
                                {!window.isSecureContext && (
                                    <p className="text-[10px] text-amber-500 mt-2 font-bold uppercase tracking-widest border border-amber-500/20 p-2 rounded">
                                        Mobile imposes strict security. Camera unavailable over HTTP.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Floating Metrics - Compact on Mobile */}
                    <div className="absolute top-4 left-4 right-4 md:right-auto md:top-8 md:left-8 flex flex-row md:flex-col gap-2 md:gap-3 md:space-y-3 z-10 pointer-events-none overflow-x-auto no-scrollbar md:overflow-visible">
                        <div className="bg-slate-950/80 backdrop-blur-xl px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-2xl border border-white/10 flex items-center gap-1.5 md:gap-3 shadow-2xl shrink-0">
                            <Activity className="w-3 h-3 md:w-5 md:h-5 text-emerald-400" />
                            <div>
                                <span className="text-[7px] md:text-[10px] font-black text-slate-500 uppercase block tracking-widest">Neural Status</span>
                                <span className="text-[9px] md:text-xs font-black text-white uppercase tracking-tighter">Live Biometrics</span>
                            </div>
                        </div>
                        <div className="bg-slate-950/80 backdrop-blur-xl px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-2xl border border-white/10 flex items-center gap-1.5 md:gap-3 shadow-2xl shrink-0">
                            <div className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full ${accuracy > 50 ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
                            <div>
                                <span className="text-[7px] md:text-[10px] font-black text-slate-500 uppercase block tracking-widest">Confidence</span>
                                <span className="text-[9px] md:text-xs font-black text-white uppercase tracking-tighter">{accuracy}% Alignment</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Feedback Bar - Desktop Overlay */}
                    <div className="hidden md:block absolute bottom-8 left-8 right-8 z-10">
                        <Card className={`p-6 bg-slate-950/90 backdrop-blur-md border-white/10 flex items-center gap-6 shadow-2xl overflow-hidden`} hover={false}>
                            {status === 'ready' ? (
                                <Activity className="w-8 h-8 text-emerald-400 animate-pulse shrink-0" />
                            ) : (
                                <Camera className="w-8 h-8 text-slate-500 shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                                <h4 className={`text-xs font-black uppercase tracking-widest text-slate-500 truncated`}>
                                    AI Guidance System
                                </h4>
                                <p className={`text-xl font-black italic tracking-tight text-white truncate`}>
                                    {feedback}
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Mobile Action Feedback Bar - Below Camera */}
                <div className="md:hidden">
                    <Card className={`p-4 bg-slate-900 border-white/10 flex items-center gap-4 shadow-xl`} hover={false}>
                        {status === 'ready' ? (
                            <Activity className="w-6 h-6 text-emerald-400 animate-pulse shrink-0" />
                        ) : (
                            <Camera className="w-6 h-6 text-slate-500 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                            <h4 className={`text-[9px] font-black uppercase tracking-widest text-slate-500`}>
                                AI Guidance System
                            </h4>
                            <p className={`text-sm font-black italic tracking-tight text-white truncate`}>
                                {feedback}
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Controls - Info Flow for Mobile */}
                <div className="space-y-4 md:space-y-6">
                    <div className="space-y-3 md:space-y-4">
                        <h3 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700 pl-3">Session Metrics</h3>
                        <Card className="p-4 md:p-6 space-y-4 md:space-y-6 bg-slate-900 shadow-xl" hover={false}>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase">Stability Index</span>
                                    <div className="flex items-center gap-4 mt-1">
                                        <div className="flex-1 h-1.5 md:h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[92%]" style={{ width: `${accuracy}%` }} />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-black text-white italic">{accuracy}%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase">Latency</span>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-[10px] md:text-xs font-black text-slate-400 italic">~15ms (WebGL)</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <h3 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-500 pl-3">Actions</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                            <Button variant="outline" className="w-full gap-2 md:gap-3 font-black uppercase tracking-widest py-3 md:py-4 border-white/10 group text-[10px] md:text-xs" onClick={() => startCamera()}>
                                <RefreshCw className="w-4 h-4 md:w-5 md:h-5 text-slate-500 group-hover:rotate-180 transition-transform duration-500" />
                                Reset
                            </Button>
                            <Button className="w-full gap-2 md:gap-3 font-black uppercase tracking-widest py-3 md:py-4 shadow-xl text-[10px] md:text-xs">
                                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                                Save
                            </Button>
                        </div>
                    </div>

                    <div className="p-4 md:p-6 bg-slate-900/40 rounded-2xl md:rounded-3xl border border-white/5 space-y-2">
                        <div className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                            Privacy Notice
                        </div>
                        <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed italic">
                            All video processing is performed locally on your device via TensorFlow.js. No footage is uploaded to the cloud.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIPoseCorrection;
