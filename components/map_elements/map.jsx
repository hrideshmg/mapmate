import React, { useState, useEffect } from "react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

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

    return null;
}
export default function Map({ data, focusPos, setFocusPos, setData }) {
  let test = true;

  const toggleLike = (index) => {
    const newData = data.map((item, i) =>
      i === index ? { ...item, liked: !item.liked } : item
    );
    setData(newData);
  };

  const likedImageSrc = (item) => `/liked.png`;
  const likeImageSrc = (item) => `/like.png`;

  //     return null;
  //   }
  // const position = [51.505, -0.09]
  // useEffect(()=>{
  //     // setData(JSON.parse(localStorage.getItem('put_in')))
  // },[])

    const [refreshFlag, setRefreshFlag] = useState(false)

    return (
        <MapContainer center={focusPos} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%", boxShadow: 'inset 0 0 60px -12px gray' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((item, index) => (
                // <button onClick={handlePosCenter}>
                
                    <Marker position={item.data.location.coordinates} key={index} 
                    eventHandlers={{
                        click: () => {
                            if (item.data.location.coordinates!=focusPos){
                                setFocusPos(item.data.location.coordinates);
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
                        <div className="flex flex-col space-y-2 pb-0 -mb-1 ">
                            <div className="flex items-center -mb-2">

                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Kochi_Skyline.jpg"
                                    width={1}
                                    height={1}
                                    className="p-1 min-w-[8vw] h-[6vw] rounded-xs"
                                    alt="Location image"
                                />
                                <p className="text-xs ml-2 pl-3">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium harum laborum assumenda, repudiandae nisi soluta porro nam consectetur veritatis voluptatum?
                                </p>
                            </div>
                            <div className="flex justify-between items-baseline ">
                                <img src="/happy.png" className="w-6 h-6 mr-3" alt="Gun image" />
                                <div className="text-2xl ">50%</div>                    
                                <img src="/gun.png" className="w-6 h-6 mr-3" alt="Gun image" />
                                <div className="text-2xl ">1.7</div>                    
                                <img src="/rainy.png" className="w-6 h-6 mr-3" alt="rain image" />
                                <div className="text-2xl ">4.5</div>                    
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
            {/* <onCh */}
            <SetViewOnClick focusPos={focusPos} refreshFlag={refreshFlag} />
        </MapContainer>
    );
}
