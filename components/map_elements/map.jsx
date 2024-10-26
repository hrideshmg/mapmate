import Image from "next/image";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

function SetViewOnClick({ focusPos }) {
    const map = useMap();

    // useEffect(() => {
    //     if (focusPos) {
    //         map.setView(focusPos.coord, map.getZoom());
    //         console.log(focusPos)
    //     }
    // }, [focusPos, map]);

    // return null;
}

export default function Map({ data, focusPos, setFocusPos }) {
    // const all_pos = [
    //     [51.505, -0.09],
    //     [51.5051, -0.10],
    //     [51.5052, -0.15],
    //     [51.5049, -0.2],
    //     [51.5048, -0.175],
    //     [51.5053, -0.125],
    // ]
    // const [focusPos, setFocusPos] = useState(all_pos[0]);
    // const handlePosCenter=({position})=>{
    //     setFocusPos(position)
    // }
    // function SetViewOnClick({ coord }) {
    //     const map = useMap();
    //     console.log(coord)
    //     map.setView(coord, map.getZoom());

    //     return null;
    //   }
    // const position = [51.505, -0.09]
    // useEffect(()=>{
    //     // setData(JSON.parse(localStorage.getItem('put_in')))
    // },[])
    return (
        <MapContainer center={data[0].data.location.coordinates} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%", boxShadow: 'inset 0 0 60px -12px gray' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((item, index) => (
                // <button onClick={handlePosCenter}>
                
                    <Marker position={item.data.location.coordinates} key={index} 
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
                                <p className="text-xl">Location name</p>
                                <div className="flex items-center space-x-3">
                                    {/* <div class="h-8 w-8 rounded-full bg-green-400"></div>  */}
                                    <img
                                        width={1}
                                        height={1}
                                        src={item.liked ? "/liked.png" : "/like.png"}
                                        alt="like image"
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={() => toggleLike(index)}
                                    />
                                    <p className="text-2xl">4.0</p>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
            <SetViewOnClick focusPos={focusPos} />
        </MapContainer>
    );
}
