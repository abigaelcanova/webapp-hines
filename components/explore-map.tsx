"use client";
import { useEffect, useRef } from "react";

export interface MapPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function ExploreMap({
  points,
  highlightedId,
  onMarkerClick,
  onViewChange,
}: {
  points: MapPoint[];
  highlightedId?: string | null;
  onMarkerClick?: (id: string) => void;
  onViewChange?: (bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

  useEffect(() => {
    if (!containerRef.current) return;

    const existingCss = document.querySelector(
      'link[data-explore-map-lib="maplibre-css"]'
    ) as HTMLLinkElement | null;
    if (!existingCss) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css";
      link.setAttribute("data-explore-map-lib", "maplibre-css");
      document.head.appendChild(link);
    }

    function ensureScript(): Promise<void> {
      return new Promise((resolve) => {
        if ((window as any).maplibregl) return resolve();
        const script = document.createElement("script");
        script.src = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js";
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    }

    let destroyed = false;

    ensureScript().then(() => {
      if (destroyed) return;
      const maplibregl = (window as any).maplibregl;
      if (!maplibregl || !containerRef.current) return;

      const center = [
        points?.[0]?.longitude ?? -95.3698,
        points?.[0]?.latitude ?? 29.7604,
      ];

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: "https://demotiles.maplibre.org/style.json",
        center,
        zoom: 12,
        attributionControl: false,
      });
      mapRef.current = map;

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }));

      // Add markers
      const bounds = new maplibregl.LngLatBounds();
      points.forEach((p) => {
        const el = document.createElement("button");
        el.type = "button";
        el.className =
          "group rounded-full bg-white border border-gray-300 shadow-md text-gray-900 text-[11px] font-medium px-2.5 py-1 hover:bg-[#BF1231] hover:text-white transition-colors";
        el.textContent = p.name.split(" ")[0];
        el.addEventListener("click", () => onMarkerClick?.(p.id));
        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([p.longitude, p.latitude])
          .addTo(map);
        markersRef.current[p.id] = { marker, el };
        bounds.extend([p.longitude, p.latitude]);
      });

      // Fit to points if we have at least 2 unique locations
      try {
        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, { padding: 40, duration: 0 });
        }
      } catch {}

      // Notify initial bounds
      try {
        const b = map.getBounds();
        onViewChange?.({
          north: b.getNorth(),
          south: b.getSouth(),
          east: b.getEast(),
          west: b.getWest(),
        });
      } catch {}

      map.on("moveend", () => {
        try {
          const b = map.getBounds();
          onViewChange?.({
            north: b.getNorth(),
            south: b.getSouth(),
            east: b.getEast(),
            west: b.getWest(),
          });
        } catch {}
      });
    });

    return () => {
      destroyed = true;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch {}
      }
      markersRef.current = {};
    };
  }, [points, onMarkerClick, onViewChange]);

  // Highlight + fly to
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.entries(markersRef.current).forEach(([id, rec]) => {
      const el: HTMLElement = rec.el;
      if (id === highlightedId) {
        el.classList.add("bg-[#BF1231]", "text-white", "border-[#BF1231]");
      } else {
        el.classList.remove("bg-[#BF1231]", "text-white", "border-[#BF1231]");
      }
    });

    const pt = points.find((p) => p.id === highlightedId);
    if (pt) {
      try {
        map.flyTo({
          center: [pt.longitude, pt.latitude],
          zoom: Math.max(map.getZoom(), 14),
          speed: 0.6,
        });
      } catch {}
    }
  }, [highlightedId, points]);

  return (
    <div className="w-full h-[calc(100vh-96px)] lg:h-[calc(100vh-88px)] rounded-none lg:rounded-2xl border overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
