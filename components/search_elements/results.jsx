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
            setFocusPos(fruit)
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
                            <div className="text-start">
                                <p className="text-[1.5vw]">{fruit.name}</p>
                            </div>
                            <div className="flex -mt-[0.5vw]">
                                <Link href={fruit.url} className="hover:bg-white rounded-full min-h-[3vw] min-w-[3vw] flex justify-center items-center">
                                    {fruit.source=='olx'?
                                    <Image src="/OLX.png" width={1} height={1} className="max-h-[2vw] w-auto" unoptimized/>
                                    :fruit.source=='Cars24'?
                                    <Image src="/cars24web.webp" width={1} height={1} className="max-h-[2vw] w-auto" unoptimized/>
                                    :fruit.source=='CarWale'?
                                    <Image src="/carwale.png" width={1} height={1} className="max-h-[2vw] w-auto" unoptimized/>
                                    :''}
                                </Link>
                                <p className="min-h-[3vw] flex items-center">Available Links to buy</p>
                                
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