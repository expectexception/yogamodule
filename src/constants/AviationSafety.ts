export interface SafetyCondition {
    id: string;
    label: string;
    category: 'Orthopedic' | 'Cardiovascular' | 'Neurological' | 'Circadian' | 'Vestibular';
    impact: string;
    description: string;
}

export const AVIATION_SAFETY_CONDITIONS: SafetyCondition[] = [
    {
        id: 'L_SPINE_COMP',
        label: 'L-Spine Compression Risk',
        category: 'Orthopedic',
        impact: 'High-Impact Inversion Restriction',
        description: 'Vertebral alignment stress typically associated with extended duration cockpit seating.'
    },
    {
        id: 'DVT_RISK',
        label: 'Micro-Circulatory Static Risk',
        category: 'Cardiovascular',
        impact: 'Circulation Booster Priority',
        description: 'Increased risk of peripheral edema and venous insufficiency due to long-haul flight patterns.'
    },
    {
        id: 'HYPERTENSION_F',
        label: 'Flight-Induced Hypertension',
        category: 'Cardiovascular',
        impact: 'Intensive Breath-work Protocols',
        description: 'Elevated blood pressure patterns synced with high-stress duty rosters.'
    },
    {
        id: 'CIRCADIAN_DS',
        label: 'Chronic Desynchronosis',
        category: 'Circadian',
        impact: 'Melatonin-Sync Flow Recommendation',
        description: 'Severe disruption of circadian rhythms leading to fatigue and sleep-state volatility.'
    },
    {
        id: 'JOINT_INST',
        label: 'Articular-Joint Instability',
        category: 'Orthopedic',
        impact: 'Stabilization Focus (Knee/Shoulder)',
        description: 'Musculoskeletal wear localized in pivotal joints from recurrent weight-bearing maneuvers.'
    },
    {
        id: 'VESTIBULAR_S',
        label: 'Spatial Disorientation Sensitivity',
        category: 'Vestibular',
        impact: 'Balance & Grounding Emphasis',
        description: 'Sensitivity to balance shifts following rapid altitude or orientation changes.'
    }
];
