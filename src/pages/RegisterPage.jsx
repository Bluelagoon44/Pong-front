import { useState } from "react";
import { useRegister } from "../services/useRegister";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [niveau, setNiveau] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adresse, setAdresse] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useRegister();

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ nom, prenom, niveau, email, password, adresse }, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1200);
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Nom" className="input input-bordered" required value={nom} onChange={e => setNom(e.target.value)} />
          <input type="text" placeholder="Prénom" className="input input-bordered" required value={prenom} onChange={e => setPrenom(e.target.value)} />
          <select className="input input-bordered" required value={niveau} onChange={e => setNiveau(e.target.value)}>
            <option value="">Niveau de ping pong</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
          </select>
          <input type="email" placeholder="Email" className="input input-bordered" required value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" className="input input-bordered" required value={password} onChange={e => setPassword(e.target.value)} />
          <input type="text" placeholder="Adresse" className="input input-bordered" required value={adresse} onChange={e => setAdresse(e.target.value)} />
          <button type="submit" className="btn btn-primary" disabled={isLoading}>S'inscrire</button>
        </form>
        {success && <div className="mt-4 text-green-600 text-center">Inscription réussie ! Redirection...</div>}
        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error?.response?.data?.message || error?.message || "Erreur d'inscription"}
          </div>
        )}
      </div>
    </div>
  );
}
