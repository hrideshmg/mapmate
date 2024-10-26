import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SampleResults({open, setOpen, setCurrIndex, data, currIndex,  setFocusPos}){
    const handleShowBrief=(index, fruit)=>{

        if (open && currIndex!=undefined && index==currIndex){
            setOpen(false)
        }else{
            setOpen(true)
            setCurrIndex(index)
            setFocusPos(fruit.data.location.coordinates)
        }
        console.log("clicked brief open", open, index, fruit)
    }
    return(
        <div>
            <ul className="text-black mt-[2vw]">
                {data.map((fruit, index) => (
                    <li>
                    <button key={index} className="min-h-[8vw] flex items-center w-full" onClick={()=>{handleShowBrief(index, fruit)}}>
                        <div className="max-h-[7.5vw] overflow-hidden rounded-[0.5vw]">
                            <Image src={fruit.image_url} width={5} height={5} className="h-auto min-w-[7.5vw]" unoptimized/>
                        </div>
                        <div className="flex flex-col min-h-[7.5vw] flex-1 mx-[1vw]">
                            <div className="text-start flex-1 ">
                                <p className="text-[1.5vw] leading-[1.5vw]">
                                    {fruit.data.address.city}, {fruit.data.address.county}, {fruit.data.address.state_district}, {fruit.data.address.country}, {fruit.data.address.postcode}
                                </p>
                                <p>54</p>
                            </div>
                            <div className="flex-1 flex items-center">
                                <p className="text-[2vw] font-semibold">{fruit.price}</p>
                            </div>
                        </div>
                    </button>
                    <div className="w-full h-0.5 bg-black rounded-[1vw] my-[1vw]"></div>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}