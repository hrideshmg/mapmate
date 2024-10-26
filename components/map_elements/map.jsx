import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

function SetViewOnClick({ focusPos }) {
    const map = useMap();
  
    useEffect(() => {
      if (focusPos) {
        map.setView(focusPos.coord, map.getZoom());
        console.log(focusPos)
      }
    }, [focusPos, map]);
  
    return null;
  }

export default function Map({data, focusPos, setFocusPos}){
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
    return(
        <MapContainer center={data[1].coord} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" , boxShadow: 'inset 0 0 60px -12px gray'}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((item, index) => (
                // <button onClick={handlePosCenter}>
                <>
                    <Marker position={item.coord} key={index} 
                    eventHandlers={{
                        click: () => {
                        setFocusPos(item);
                        },}}
                    >
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    {/* <SetViewOnClick focusPos={focusPos}/> */}
                    </>
                // </button>
                ))
                }
                <SetViewOnClick focusPos={focusPos}/>
            {/* <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
        </MapContainer>
    )
}