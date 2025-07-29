import { useState } from "react";
import { useCreateAd } from "../services/useCreateAd";
import { useAddressAutocomplete } from "../services/useAddressAutocomplete";

export default function CreateAdPage() {
  const [titre, setTitre] = useState("");
  const [adresse, setAdresse] = useState("");
  const { suggestions, loading: loadingSuggestions, onInputChange, clearSuggestions } = useAddressAutocomplete();
  const [places, setPlaces] = useState(1);
  const [date, setDate] = useState("");
  const { mutate, isLoading, error, isSuccess } = useCreateAd();

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ titre, adresse, places, date }, {
      onSuccess: () => {
        setTitre("");
        setAdresse("");
        setPlaces(1);
        setDate("");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer une annonce</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Titre" className="input input-bordered" required value={titre} onChange={e => setTitre(e.target.value)} />
          <div className="relative">
            <input
              type="text"
              placeholder="Adresse"
              className="input input-bordered w-full"
              required
              value={adresse}
              onChange={e => {
                setAdresse(e.target.value);
                onInputChange(e.target.value);
              }}
              autoComplete="off"
              onBlur={() => setTimeout(clearSuggestions, 200)}
            />
            {loadingSuggestions && (
              <div className="absolute left-0 right-0 bg-white border border-gray-200 z-10 p-2 text-sm text-gray-500">Chargement...</div>
            )}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border border-gray-200 z-10 max-h-48 overflow-y-auto rounded shadow">
                {suggestions.map((s, idx) => (
                  <li
                    key={s.display + idx}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    onMouseDown={() => {
                      setAdresse(s.display);
                      clearSuggestions();
                    }}
                  >
                    {s.display}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input type="number" placeholder="Nombre de places" className="input input-bordered" min="1" required value={places} onChange={e => setPlaces(e.target.value)} />
          <input type="date" className="input input-bordered" required value={date} onChange={e => setDate(e.target.value)} />
          <button type="submit" className="btn btn-primary" disabled={isLoading}>Publier l'annonce</button>
        </form>
        {isSuccess && <div className="mt-4 text-green-600 text-center">Annonce publiée !</div>}
        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error?.response?.data?.message || error?.message || "Erreur lors de la création"}
          </div>
        )}
      </div>
    </div>
  );
}
