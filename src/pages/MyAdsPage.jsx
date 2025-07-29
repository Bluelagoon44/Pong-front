import React from "react";
import { useGetMyAds } from "../services/useGetMyAds";
import { useDeleteAd } from "../services/useDeleted";

export default function MyAdsPage() {
  const { data: ads = [], isLoading, error } = useGetMyAds();
  const deleteAd = useDeleteAd();
  return (
    <div className="main-container min-h-screen py-8">
      <h2 className="text-2xl font-bold mb-6">Mes annonces créées</h2>
      {isLoading ? (
        <div className="text-center">Chargement...</div>
      ) : error ? (
        <div className="text-red-500 text-center">Erreur lors du chargement</div>
      ) : ads.length === 0 ? (
        <div className="text-gray-500 text-center">Aucune annonce créée.</div>
      ) : (
        <ul className="space-y-6">
          {ads.map(ad => (
            <li key={ad.id} className="card-ad">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-blue-700 text-lg mb-1 truncate">{ad.titre}</div>
                  <div className="text-sm text-gray-600 mb-1 truncate">{ad.adresse}</div>
                  <div className="text-xs text-gray-500 mb-1">Date : {ad.date && new Date(ad.date).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500 mb-1">Places : {ad.places}</div>
                </div>
                <div className="flex flex-col md:items-end mt-2 md:mt-0">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded mb-2"
                    disabled={deleteAd.isLoading}
                    onClick={() => {
                      if (window.confirm("Confirmer la suppression de cette annonce ?")) {
                        deleteAd.mutate(ad.id);
                      }
                    }}
                  >
                    {deleteAd.isLoading ? "Suppression..." : "Supprimer"}
                  </button>
                  <span className="badge-places badge-green mb-2">{ad.inscrits?.length || 0} inscrit(s)</span>
                  {ad.inscrits && ad.inscrits.length > 0 && (
                    <div className="bg-gray-50 rounded-xl shadow-inner p-3 w-full md:w-72">
                      <div className="font-semibold text-sm mb-2">Participants inscrits :</div>
                      <ul className="divide-y divide-gray-200">
                        {ad.inscrits.map(u => (
                          <li key={u.id} className={`py-1 flex items-center gap-2 ${u.id === ad.userId ? 'bg-blue-50 font-bold' : ''}`}>
                            <span className={`font-medium ${u.id === ad.userId ? 'text-blue-700' : ''}`}>{u.prenom} {u.nom}</span>
                            <span className="text-xs text-gray-500">({u.niveau})</span>
                            {u.id === ad.userId && (
                              <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs">Créateur</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
