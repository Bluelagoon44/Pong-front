import React, { useState } from "react";
import { useGetAds } from "../services/useGetAds";
import { useRegisterToAd } from "../services/useRegisterToAd";
import { useAuthStore } from "../features/authStore";
import MapLibreAdMap from "../components/MapLibreAdMap";

const niveaux = ["Débutant", "Intermédiaire", "Avancé"];

export default function DashboardPage() {
  const [view, setView] = useState("map");
  const [niveau, setNiveau] = useState("");
  const [adresse, setAdresse] = useState("");
  const [date, setDate] = useState("");
  const { data: ads = [], isLoading, error } = useGetAds({ niveau, adresse, date });
  const { mutate: registerToAd, isPending } = useRegisterToAd();
  const user = useAuthStore(s => s.user);
  const userId = user?.id;
  const [msgByAd, setMsgByAd] = useState({});

  return (
    <div className="main-container min-h-screen py-6">
      <h2 className="text-2xl font-bold mb-4">Tableau de bord des annonces</h2>
      <div className="flex gap-2 mb-6">
        <button
          className={`btn ${view === "map" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setView("map")}
        >
          Carte interactive
        </button>
        <button
          className={`btn ${view === "list" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setView("list")}
        >
          Vue liste
        </button>
      </div>
      <div className="flex gap-4 mb-4 flex-wrap">
        <select className="input input-bordered" value={niveau} onChange={e => setNiveau(e.target.value)}>
          <option value="">Tous niveaux</option>
          {niveaux.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <input type="text" placeholder="Filtrer par adresse" className="input input-bordered" value={adresse} onChange={e => setAdresse(e.target.value)} />
        <input type="date" className="input input-bordered" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      {isLoading ? (
        <div className="text-center mt-8">Chargement des annonces...</div>
      ) : error ? (
        <div className="text-red-500 text-center mt-8">Erreur lors du chargement</div>
      ) : view === "map" ? (
        <div className="h-96">
          {/* Carte MapLibre intégrée */}
          <MapLibreAdMap ads={ads} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow p-4">
          {ads.length === 0 ? (
            <div className="text-gray-500 text-center">Aucune annonce trouvée.</div>
          ) : (
            <ul className="divide-y">
              {/* Détection user connecté et branchement bouton d’inscription */}
              {ads.map(ad => {
                const inscrits = ad.inscrits || ad.inscriptions || [];
                const dejaInscrit = inscrits.some(u => u.userId ? u.userId === Number(userId) : u.id === Number(userId));
                const placesRestantes = ad.places - inscrits.length;
                let badgeClass = "badge-green";
                if (placesRestantes === 0) badgeClass = "badge-red";
                else if (placesRestantes <= 2) badgeClass = "badge-orange";
                return (
                  <li key={ad.id} className="card-ad">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-blue-700 text-lg truncate">{ad.titre}</span>
                        <span className={`badge-places ${badgeClass}`}>{placesRestantes > 0 ? `${placesRestantes} places` : "Complet"}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1 truncate">{ad.adresse}</div>
                      <div className="text-xs text-gray-500 mb-1">Date : {ad.date && new Date(ad.date).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500 mb-1">Créateur : {ad.user?.prenom} {ad.user?.nom} ({ad.user?.niveau})</div>
                      {msgByAd[ad.id] && <div className="text-xs text-green-700 mt-1">{msgByAd[ad.id]}</div>}
                    </div>
                    <div className="flex flex-col items-end gap-2 mt-2 md:mt-0">
                      <button
                        className={`btn ${placesRestantes === 0 || dejaInscrit ? "btn-outline cursor-not-allowed opacity-60" : ""}`}
                        disabled={placesRestantes === 0 || dejaInscrit || isPending}
                        onClick={() => {
                          registerToAd(ad.id, {
                            onSuccess: () => setMsgByAd(m => ({ ...m, [ad.id]: "Inscription réussie !" })),
                            onError: e => setMsgByAd(m => ({ ...m, [ad.id]: e?.response?.data?.message || "Erreur d’inscription" }))
                          });
                        }}
                      >
                        {placesRestantes === 0 ? "Complet" : dejaInscrit ? "Déjà inscrit" : isPending ? "..." : "S’inscrire"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
