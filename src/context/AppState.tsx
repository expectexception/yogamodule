import { createContext, useContext, useState, type ReactNode } from 'react';

export interface UserProfile {
    jobTitle: string;
    dob: string;
    gender: string;
    height: string;
    weight: string;
    bmi: string;
    medicalConditions: string[];
}

interface AppState {
    isLoggedIn: boolean;
    userProfile: UserProfile | null;
    medicalHistoryCompleted: boolean;
    currentScale: number;
    flightData: { type: string; duration: string } | null;
    tensionArea: string | null;
    login: () => void;
    logout: () => void;
    updateProfile: (profile: UserProfile) => void;
    setMedicalHistoryStatus: (status: boolean) => void;
    setScale: (scale: number) => void;
    setFlightData: (data: { type: string; duration: string } | null) => void;
    setTensionArea: (area: string | null) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [medicalHistoryCompleted, setMedicalHistoryCompleted] = useState(false);
    const [currentScale, setCurrentScale] = useState(0);
    const [flightData, setFlightData] = useState<{ type: string; duration: string } | null>(null);
    const [tensionArea, setTensionArea] = useState<string | null>(null);

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false);
        setUserProfile(null);
        setMedicalHistoryCompleted(false);
        setCurrentScale(0);
        setFlightData(null);
        setTensionArea(null);
    };

    const updateProfile = (profile: UserProfile) => setUserProfile(profile);
    const setMedicalHistoryStatus = (status: boolean) => setMedicalHistoryCompleted(status);
    const setScale = (scale: number) => setCurrentScale(scale);
    const setFlightDataHandler = (data: { type: string; duration: string } | null) => setFlightData(data);
    const setTensionAreaHandler = (area: string | null) => setTensionArea(area);

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                userProfile,
                medicalHistoryCompleted,
                currentScale,
                flightData,
                tensionArea,
                login,
                logout,
                updateProfile,
                setMedicalHistoryStatus,
                setScale,
                setFlightData: setFlightDataHandler,
                setTensionArea: setTensionAreaHandler,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
};
