import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AnimatedBackground from './components/ui/AnimatedBackground';
import GhostMode from './pages/GhostMode';
import Navbar from './components/ui/Navbar'; // Assuming Navbar is in components/ui

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-black overflow-x-hidden">
        <Navbar />
        <AnimatedBackground />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ghost-mode" element={<GhostMode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
