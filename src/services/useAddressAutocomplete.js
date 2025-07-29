import { useState, useRef } from "react";

export function useAddressAutocomplete() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef();

  // Appelé à chaque changement du champ adresse
  const onInputChange = (value) => {
    if (timer.current) clearTimeout(timer.current);
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&addressdetails=1&limit=5`;
        const res = await fetch(url);
        const data = await res.json();
        setSuggestions(data.map(item => ({
          display: item.display_name,
          lat: item.lat,
          lon: item.lon
        })));
      } catch (e) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const clearSuggestions = () => setSuggestions([]);

  return { suggestions, loading, onInputChange, clearSuggestions };
}
