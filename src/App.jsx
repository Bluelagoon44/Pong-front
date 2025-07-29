import './App.css'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateAdPage from "./pages/CreateAdPage";
import MyAdsPage from "./pages/MyAdsPage";
import { useAuthStore } from "./features/authStore";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white px-4 py-2 flex gap-4 items-center">
      <Link to="/" className="font-bold text-lg">🏓 Pongistes</Link>
      <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      <Link to="/create-ad" className="hover:underline">Créer une annonce</Link>
      {user && (
        <Link to="/my-ads" className="hover:underline">Mes annonces</Link>
      )}
      <div className="flex-1" />
      {!user && <Link to="/login" className="hover:underline">Connexion</Link>}
      {!user && <Link to="/register" className="hover:underline">Inscription</Link>}
      {user && (
        <button className="btn btn-outline ml-2" onClick={handleLogout}>Déconnexion</button>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-ad" element={<CreateAdPage />} />
          <Route path="/my-ads" element={<MyAdsPage />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App
