'use client';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import SearchForm from "@/components/search_elements/search_form";
import { useEffect } from "react";

export default function Home() {
  const position = [51.23, -0.09];

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

          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>

          {/* Add the component to control map movement */}
          <MapMover />
        </MapContainer>

        {/* Overlay content */}
        <div className="absolute inset-0 z-[500] flex justify-center items-center pointer-events-none">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-start">
              <p className="text-[4.5vw]">Scrapeyard</p>
              <p className="text-start px-[0.5vw] text-[1.5vw] bg-black text-white">
                Get your prices right
              </p>
            </div>
          </div>
          <div className="flex-1 flex">
            {/* Enable pointer events on interactive elements */}
            <div className="pointer-events-auto">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapMover() {
  const map = useMap();

  useEffect(() => {
    let lat = 51.23;
    let lng = -0.09;

    const interval = setInterval(() => {
      lng -= 0.001; 
      map.setView([lat, lng], map.getZoom());
    }, 100); 

    return () => {
      clearInterval(interval);
    };
  }, [map]);

  return null;
}
