export interface Protocol {
    id: string;
    title: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    focus: string;
    description: string;
}

export interface BodyPart {
    id: string;
    label: string;
    description: string;
    protocols: Protocol[];
}

export const BODY_MAP_DATA: BodyPart[] = [
    {
        id: 'c_spine',
        label: 'Cervical Spine (Neck)',
        description: 'High tension area due to prolonged headset usage and downward gaze in cockpit.',
        protocols: [
            {
                id: 'atlas_decompression',
                title: 'Atlas Decompression',
                duration: '5 min',
                level: 'Beginner',
                focus: 'C1/C2 Mobility',
                description: 'Gentle traction to release sub-occipital tension caused by heavy headsets.'
            },
            {
                id: 'scm_release',
                title: 'SCM Muscle Release',
                duration: '8 min',
                level: 'Intermediate',
                focus: 'Neck Rotation',
                description: 'Targets the Sternocleidomastoid to improve scan-flow mobility.'
            }
        ]
    },
    {
        id: 'l_spine',
        label: 'Lumbar Spine (Lower Back)',
        description: 'Primary site of "G-Force Spinal Compression" and seated fatigue.',
        protocols: [
            {
                id: 'cockpit_decompression',
                title: 'Cockpit Decompression',
                duration: '12 min',
                level: 'Beginner',
                focus: 'Vertebral Space',
                description: 'Seated spinal elongation techniques to counteract hours of vertical compression.'
            },
            {
                id: 'psoas_release',
                title: 'Deep Psoas Release',
                duration: '15 min',
                level: 'Advanced',
                focus: 'Hip Flexors',
                description: 'Releases the "fight or flight" muscle engaged during high-stress approaches.'
            }
        ]
    },
    {
        id: 'hips',
        label: 'Hip Complex',
        description: 'Restricted blood flow area from static seated positions.',
        protocols: [
            {
                id: 'venous_return',
                title: 'Venous Return Flow',
                duration: '10 min',
                level: 'Beginner',
                focus: 'Circulation',
                description: 'Promotes blood return from lower extremities to prevent micro-circulatory stagnation.'
            },
            {
                id: 'piriformis_stretch',
                title: 'Sciatic Nerve Glide',
                duration: '8 min',
                level: 'Intermediate',
                focus: 'Nerve Health',
                description: 'Relieves prevent sciatic impingement common in stiff crew seats.'
            }
        ]
    },
    {
        id: 'shoulders',
        label: 'Shoulder Girdle',
        description: 'Accumulates "Control Column Loading" stress and scapular stiffness.',
        protocols: [
            {
                id: 'scapular_reset',
                title: 'Scapular Reset',
                duration: '6 min',
                level: 'Beginner',
                focus: 'Posture',
                description: 'Re-aligns shoulders rounded forward by flight deck ergonomics.'
            }
        ]
    },
    {
        id: 'ankles',
        label: 'Ankle / Foot',
        description: 'Risk zone for fluid retention and DVT during long-haul sectors.',
        protocols: [
            {
                id: 'dvt_prevention',
                title: 'DVT Pump Activation',
                duration: '4 min',
                level: 'Beginner',
                focus: 'Blood Flow',
                description: 'Rapid calf-pump exercises to manually assist venous return.'
            }
        ]
    }
];
