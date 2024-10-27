"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import SearchForm from "@/components/search_elements/search_form";
import { useEffect } from "react";
import { useCoords } from "./_context/CoordsContext";

export default function Home() {
  const position = [51.23, -0.09];
  const { coords, settlementData, progress } = useCoords();

  return (
    <div className="relative bg-transparent text-black">
      {/* Relatively positioned container */}
      <div className="relative">
        {/* MapContainer remains in the normal flow */}
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Call the function to control map movement */}
          <MapMover coords={coords} />
          <Tester progress={progress} />
        </MapContainer>

        {/* Overlay content */}
        <div className="absolute inset-0 z-[500] flex justify-center items-center pointer-events-none">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-start">
              <p className="text-[4.5vw]">Urbanalyze</p>
              <p className="text-start px-[0.5vw] text-[1.5vw] bg-black text-white  shadow-[0_2px_20px_rgba(0,_0,_0,_0.3)]">
                Find your dream location
              </p>
            </div>
          </div>
          <div className="flex-1 flex">
            {/* Enable pointer events on interactive elements */}
            <div className="pointer-events-auto p-2 rounded-3xl">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Tester({ progress }) {
  useEffect(() => {
    console.log(progress);
  }, [progress]);
}

function MapMover({ coords }) {
  const map = useMap();
  map.setZoom(12);

  useEffect(() => {
    let lat = coords[0];
    let lng = coords[1];
    const interval = setInterval(() => {
      lng += 0.001;
      map.setView([lat, lng], map.getZoom());
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [map, coords]);

  return null;
}
