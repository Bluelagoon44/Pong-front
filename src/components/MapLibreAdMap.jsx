import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css'; 



export default function MapLibreAdMap({ ads }) {
  const mapContainer = useRef(null);
  const mapRef = useRef();
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (!mapRef.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [2.35, 48.85],
        zoom: 5,
      });
    }
    return () => {
      // Nettoyage carte si démontage
      if (mapRef.current) mapRef.current.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    let cancelled = false;
    function clearMarkers() {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
    }
    function plotMarkers() {
      clearMarkers();
      for (const ad of ads) {
        if (!ad.latitude || !ad.longitude || cancelled) continue;
        const marker = new maplibregl.Marker({ offset: [0, -21] })
          .setLngLat([ad.longitude, ad.latitude])
          .setPopup(new maplibregl.Popup().setHTML(`<b>${ad.titre}</b>`))
          .addTo(map);
        markersRef.current.push(marker);
      }
    }
    plotMarkers();
    map.on('moveend', plotMarkers);
    map.on('zoomend', plotMarkers);
    return () => {
      cancelled = true;
      map.off('moveend', plotMarkers);
      map.off('zoomend', plotMarkers);
      clearMarkers();
    };
  }, [ads]);

  return (
    <div
      ref={mapContainer}
      className="maplibre-container relative w-full h-[450px] rounded-2xl shadow overflow-hidden"
      style={{ minHeight: 350, minWidth: 0 }}
    />
  );
}

