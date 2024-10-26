import React, { useState, useEffect } from "react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useCoords } from "@/app/_context/CoordsContext";

function SetViewOnClick({ focusPos, refreshFlag }) {
    const map = useMap();

    console.log(focusPos,'here is focuspos inside map')
    useEffect(() => {

    // console.log(typeof(focusPos[0]), 'here is typ')
    if (focusPos) {
        map.setView(focusPos, map.getZoom());
        console.log(focusPos)
    }
  }, [focusPos, map, refreshFlag]);
}
 
export default function Map({ focusPos, setFocusPos }) {
  let test = true;

  const {settlementData, setSettlementData} = useCoords()

  const toggleLike = (index) => {
    const newData = settlementData.map((item, i) =>
      i === index ? { ...item, liked: !item.liked } : item
    );
    setSettlementData(newData);
  };

  const likedImageSrc = (item) => `/liked.png`;
  const likeImageSrc = (item) => `/like.png`;

  const [refreshFlag, setRefreshFlag] = useState(false)

  return (
    <MapContainer
      center={settlementData[0].address.location}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "100vh",
        width: "100%",
        boxShadow: "inset 0 0 60px -12px gray",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {settlementData.map((item, index) => (
        // <button onClick={handlePosCenter}>

        <Marker
          position={item.address.location}
          key={index}
          eventHandlers={{
            click: () => {
                if (item.address.location!=focusPos){
                    setFocusPos(item.address.location);
                }else{
                    
                    if (refreshFlag==true){
                        setRefreshFlag(false)
                    }else{
                        setRefreshFlag(true)
                    }
                }
            },
          }}
        >
          <Popup>
                <div className="flex flex-col space-y-2 pb-0 -mb-1">
                    <div className="flex items-center pb-2">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Kochi_Skyline.jpg"
                                width={1}
                                height={1}
                                className="p-1 min-w-[8vw] h-[6vw] rounded-xl"
                                alt="Location image"
                            />
                            <p className="text-base ml-2 pl-3">
                                Lakkidi, Ottapalam, palakkad, kerala, india
                            </p>
                        </div>
                        <div className="flex justify-center">
                        <div className="flex justify-between items-center space-x-6">
                          <div className="flex items-center space-x-1 group relative">
                            <img src="/happy.png" className="w-6 h-6" alt="Happy image" />
                            <div className="text-2xl">50%</div>
                            <div className="absolute top-full right-0 transform translate-x-52 translate-y-12 mt-2 bg-white w-80 border border-gray-200 text-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-85 transition-opacity">
                              Happyness rate is determined by getting something from some other thing (Hopefully)
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 group relative">
                            <img src="/gun.png" className="w-6 h-6" alt="Gun image" />
                            <div className="text-2xl">1.7</div>
                            <div className="absolute top-full right-0 transform translate-x-32 translate-y-12 mt-2 bg-white w-80 border border-gray-200 text-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-85 transition-opacity">
                              Safety score is determined by getting something from some other thing (Hopefully)
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 group relative">
                            <img src="/rainy.png" className="w-6 h-6" alt="Rainy image" />
                            <div className="text-2xl">90%</div>
                            <div className="absolute top-full right-0 transform translate-x-6 translate-y-12 mt-2 bg-white w-80 border border-gray-200 text-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-85 transition-opacity">
                                Rain probability is determined by getting something from some other thing (Hopefully)
                            </div>
                          </div>
                        </div>

                        </div>
                        <div className="flex justify-between items-baseline ">
                            <div className="text-2xl ">Location name</div>
                            <div className="flex items-center space-x-7 ">
                                <img
                                    width={1}
                                    height={1}
                                    src={item.liked ? likedImageSrc(item) : likeImageSrc(item)}
                                    alt="like image"
                                    className="w-6 h-6 cursor-pointer"
                                    onClick={() => toggleLike(index)}
                                />
                            </div>
                            <div className="text-2xl text-green-500 font-bold ">4.5</div>
                        </div>
                    </div>
                </Popup>
        </Marker>
      ))}
      <SetViewOnClick focusPos={focusPos} refreshFlag={refreshFlag} />
    </MapContainer>
  );
}
