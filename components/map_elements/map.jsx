import React, { useState, useEffect } from "react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Map({ data, focusPos, setFocusPos, setData}) {
    let test=true;

    const toggleLike = (index) => {
        const newData = data.map((item, i) => 
            i === index ? { ...item, liked: !item.liked } : item
        );
        setData(newData);
    };
    

    const likedImageSrc = item => `/liked.png`;
    const likeImageSrc = item => `/like.png`;

    return (
        <MapContainer center={data[1].coord} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%", boxShadow: 'inset 0 0 60px -12px gray' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((item, index) => (
                <Marker
                    position={item.coord}
                    key={index}
                    eventHandlers={{
                        click: () => {
                            setFocusPos(item);
                        },
                    }}
                >
                    <Popup>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Kochi_Skyline.jpg"
                                    width={1}
                                    height={1}
                                    className="p-1 min-w-[7vw] h-[6vw]"
                                    alt="Location image"
                                />
                                <p className="text-xs ml-2 pl-3">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium harum laborum assumenda, repudiandae nisi soluta porro nam consectetur veritatis voluptatum?
                                </p>
                            </div>
                            <div className="flex justify-between items-center m-0">
                                <p className="text-2xl">Location name</p>
                                <div className="flex items-center space-x-3">
                                    <img
                                        width={1}
                                        height={1}
                                        src={item.liked ? likedImageSrc(item) : likeImageSrc(item)}
                                        alt="like image"
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={() => toggleLike(index)}
                                    />
                                    <p className="text-2xl text-green-500 font-bold">4.5</p>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
