"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SearchForm from "@/components/search_elements/search_form";
import { useCoords } from "./_context/CoordsContext";
import { useMap } from "react-leaflet";
// Dynamically import Leaflet components to prevent SSR errors
const MapContainerNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  },
);
const TileLayerNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  },
);
const MarkerNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  },
);
const PopupNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  {
    ssr: false,
  },
);

// Main Home component
export default function Home() {
  const position = [51.23, -0.09];
  const { coords, settlementData, progress } = useCoords();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure this code runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative bg-transparent text-black">
      <div className="relative">
        {/* Conditionally render MapContainer only if on client */}
        {isClient && (
          <MapContainerNoSSR
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayerNoSSR
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMover coords={coords} />
            <Tester progress={progress} />
          </MapContainerNoSSR>
        )}

        {/* Overlay content */}
        <div className="absolute inset-0 z-[500] flex justify-center items-center pointer-events-none">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-start">
              <p className="text-[4.5vw]">
                {isLoading ? <>Urbanalyzing...</> : <>Urbanalyze</>}
              </p>
              <p className="text-start px-[0.5vw] text-[1.5vw] bg-black text-white shadow-[0_2px_20px_rgba(0,_0,_0,_0.3)]">
                Find your dream location
              </p>
            </div>
          </div>
          <div className="flex-1 flex">
            <div className="pointer-events-auto p-2 rounded-3xl">
              <SearchForm isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tester component
function Tester({ progress }) {
  useEffect(() => {
    // You can add any additional logic here
  }, [progress]);
}

// MapMover component for controlling map movements based on coordinates
function MapMover({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      let lat = coords[0];
      let lng = coords[1];
      const interval = setInterval(() => {
        lng += 0.001;
        map.setView([lat, lng], map.getZoom());
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [map, coords]);

  return null;
}
