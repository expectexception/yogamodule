import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppState';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from './pages/ProfileSetup';
import MedicalHistory from './pages/MedicalHistory';
import Scale from './pages/Scale';
import YogaDashboard from './pages/YogaDashboard';
import Scoring from './pages/Scoring';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import FlightMode from './pages/FlightMode';
import AIPoseCorrection from './pages/AIPoseCorrection';
import BodyMap from './pages/BodyMap';
import Leaderboard from './pages/Leaderboard';
import JetLagRecovery from './pages/JetLagRecovery';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/medical-history" element={<MedicalHistory />} />
            <Route path="/scale" element={<Scale />} />
            <Route path="/yoga-dashboard" element={<YogaDashboard />} />
            <Route path="/scoring" element={<Scoring />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/flight-mode" element={<FlightMode />} />
            <Route path="/ai-pose" element={<AIPoseCorrection />} />
            <Route path="/body-map" element={<BodyMap />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/jet-lag" element={<JetLagRecovery />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
