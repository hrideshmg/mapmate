import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useCoords } from "@/app/_context/CoordsContext";

function SetViewOnClick({ focusPos, refreshFlag }) {
  const map = useMap();

  useEffect(() => {
    // console.log(typeof(focusPos[0]), 'here is typ')
    if (focusPos) {
      map.setView(focusPos, map.getZoom());
    }
  }, [focusPos, map, refreshFlag]);
}

export default function Map({ focusPos, setFocusPos }) {
  let test = true;
  const { settlementData, setSettlementData } = useCoords();
  const toggleLike = (index) => {
    const newData = settlementData.map((item, i) =>
      i === index ? { ...item, liked: !item.liked } : item,
    );
    setSettlementData(newData);
  };

  const likedImageSrc = (item) => `/liked.png`;
  const likeImageSrc = (item) => `/like.png`;

  const [refreshFlag, setRefreshFlag] = useState(false);
  const getAqiColor = (value) => {
    if ((value > 0) & (value < 51)) return "text-green-500";
    if ((value > 50) & (value < 101)) return "text-yellow-500";
    return "text-red-500";
  };

  const getLivingConditionColor = (value) => {
    if ((value > 0) & (value < 51)) return "text-red-500";
    if ((value > 50) & (value < 76)) return "text-yellow-500";
    if ((value > 74) & (value < 100)) return "text-green-500";
    return "text-red-500";
  };

  const getLivingConditionEmoji = (value) => {
    if ((value > 0) & (value < 25)) return "/sad.png";
    if ((value > 25) & (value < 50)) return "/straight.png";
    if ((value > 50) & (value < 76)) return "/happy.png";
    if ((value > 75) & (value < 100)) return "/extremeHappy.png";
    return "/sad.png";
  };

  const getWeatherIcon = (value) => {
    if ((value > 94) & (value < 100) || (value > 50) & (value < 68))
      return "/rainy.png";
    if ((value > 70) & (value < 79)) return "/snow.png";
    if ((value > 79) & (value < 85)) return "/sun-shower.png";
    if ((value > 0) & (value < 4)) return "/cloud.png";
    if (value == 0) return "/sun.png";
    return "/sun.png";
  };

  const getWeatherDesciption = (value) => {
    if (value == 1 || value == 3 || value == 2) return "Partially cloudy";
    if ((value > 94) & (value < 100) || (value > 50) & (value < 68))
      return "Rainy";
    if (value == 45 || value == 48) return "Fog";
    if (value == 51 || value == 53 || value == 55) return "Drizzle";
    if (value == 56 || value == 57) return "Freezing drizzle";
    if (value == 71 || value == 73 || value == 75) return "Snow fall";
    if (value == 80 || value == 81 || value == 82) return "Showers";
    if (value == 95 || value == 96 || value == 99) return "Thunderstorm";
    return "Clear";
  };

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
              if (item.address.location != focusPos) {
                setFocusPos(item.address.location);
              } else {
                if (refreshFlag == true) {
                  setRefreshFlag(false);
                } else {
                  setRefreshFlag(true);
                }
              }
            },
          }}
        >
          <Popup>
            <div className="flex flex-col space-y-2 pb-0 -mb-1">
              <div className="flex items-center pb-2">
                <img
                  src={item.images?.tiny}
                  width={1}
                  height={1}
                  className="p-1 min-w-[8vw] h-[6vw] rounded-xl"
                  alt="Location image"
                />
                <p className="text-base ml-2 pl-3">
                  {`${item.address.display_name}`}
                </p>
              </div>
              <div className="flex justify-evenly">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1 group relative">
                    <img
                      src={`${getLivingConditionEmoji(item.index)}`}
                      className="w-6 h-6"
                      alt="Happy image"
                    />
                    <div
                      className={`text-2xl ${getLivingConditionColor(item.index)} text-bold`}
                    >
                      {item.index}
                    </div>
                    <div className="absolute top-full right-0 transform translate-x-64 -translate-y-24 mt-2 bg-white w-80 border border-gray-200 text-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      The suitability index is calculated by combining various
                      parameters and user preferences
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 group relative pl-2">
                    <img src="/leaf.png" className="w-6 h-6" alt="Gun image" />
                    <div
                      className={`text-2xl ${getAqiColor(item.calamity.aqi)} text-bold`}
                    >
                      {item.calamity.aqi}
                    </div>
                    <div className="absolute top-full right-0 transform translate-x-44 -translate-y-24 mt-2 bg-white w-80 border border-gray-200 text-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Air quality index is a measure of how breathable the air
                      is
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 group relative">
                    <img
                      src={`${getWeatherIcon(item.weather.code)}`}
                      className="w-9 h-9"
                      alt="Rainy image"
                    />
                    <div className="text-base pl-3 text-lg">{`${getWeatherDesciption(item.weather.code)}`}</div>
                    <div className="absolute top-full right-0 transform translate-x-16 -translate-y-24 mt-2 bg-white w-80 border border-gray-200 text-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Current weather is indicative of the changing seasons
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-baseline">
                <div className="text-2xl">{`${item.address.city}`}</div>
                <div className="flex items-center space-x-7">
                  <img
                    width={1}
                    height={1}
                    src={item.liked ? likedImageSrc(item) : likeImageSrc(item)}
                    alt="like image"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => toggleLike(index)}
                  />
                  <div className="text-2xl text-green-500 font-bold">4.5</div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      <SetViewOnClick focusPos={focusPos} refreshFlag={refreshFlag} />
    </MapContainer>
  );
}
