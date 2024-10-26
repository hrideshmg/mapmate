'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import ArrowDownLeft from "../svg/expand_arrow"
import ChevronDefaultLeft from "../svg/contract_arrow"
import X from "../svg/x"
import Link from "next/link"

export default function ProductBrief({ open, setOpen, currBrief }) {
    const [expand, setExpand] = useState({ w: "min-w-[30vw]", h: "min-h-[20vw]" })

    const handleClick = () => {
        setExpand((prev) => ({
            ...prev,
            h: prev.h === "min-h-[20vw]" ? "min-h-[98vh]" : "min-h-[20vw]"
        }));
        console.log("hello", expand);
    };
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (open == false) {
            setExpand({ w: "min-w-[30vw]", h: "min-h-[20vw]" })
        }
    }, [open])
    return (
        <div className={`absolute z-[500] text-black ${expand.w} ${expand.h} bg-light rounded-[3vw] m-[0.5vw] flex flex-col p-[1.5vw] ${open ? '' : 'hidden'}`}>
            <div className="flex">
                <button className={`${expand.w == 'min-h-[98vh]' ? 'hidden' : ''}`} onClick={handleClick}><ChevronDefaultLeft /></button>
                <div className="w-full"></div>
                <button onClick={handleClose}><X /></button>
            </div>
            <div className={` bg-white ${expand.w == 'min-w-[30vw]' ? '' : 'flex pb-[2vw]'} rounded-[2vw] p-[1vw]`}>
                <div className="w-[30vw] overflow-hidden max-h-[20vw] rounded-[1vw]"><Image src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/de/f0/eb/backwater-tourism.jpg?w=700&h=-1&s=1" width={1} height={1} className="h-auto min-w-[30vw]" unoptimized /></div>
                <div className="pl-[1vw]">
                    <div className="text-[2vw] font-semibold">{currBrief.name}</div>
                </div>
            </div>
            <div className={`${expand.w == 'min-w-[30vw]' ? 'hidden' : ''} flex-[2] flex flex-col`}>
                <Link href="http://192.168.231.188:8501/?brand=hyundai&model=i20">Link to DV</Link>
            </div>
            <button className={`${expand.h === "min-h-[98vh]" ? 'hidden' : ''}`} onClick={handleClick}>
                <ArrowDownLeft />
            </button>

        </div>
    )
}
