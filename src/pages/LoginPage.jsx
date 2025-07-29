import { useState } from "react";
import { useLogin } from "../services/useLogin";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ email, password }, {
      onSuccess: () => navigate("/dashboard"),
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="input input-bordered" required value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" className="input input-bordered" required value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="btn btn-primary" disabled={isLoading}>Se connecter</button>
        </form>
        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error?.response?.data?.message || error?.message || "Erreur de connexion"}
          </div>
        )}
      </div>
    </div>
  );
}
