"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ArrowDownLeft from "../svg/expand_arrow";
import ChevronDefaultLeft from "../svg/contract_arrow";
import X from "../svg/x";
import Link from "next/link";
import Stats from "./stats";

export default function ProductBrief({ open, setOpen, currBrief }) {
  const [expand, setExpand] = useState({
    w: "min-w-[25vw]",
    h: "min-h-[20vw]",
  });

  const handleClick = () => {
    setExpand((prev) => ({
      ...prev,
      h: prev.h === "min-h-[20vw]" ? "min-h-[98vh]" : "min-h-[20vw]",
      w: prev.h === "min-h-[20vw]" ? "min-w-[30vw]" : "min-w-[25vw]",
    }));
    console.log("hello", expand);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    console.log(currBrief.address?.display_name,'here is currbrief')
  },[currBrief])

  useEffect(() => {
    if (open == false) {
      setExpand({ w: "min-w-[25vw]", h: "min-h-[20vw]" });
    }
  }, [open]);
  return (
    <div className={`${open ? "" : "hidden"} absolute z-[500] flex flex-col`}>
    <div
      className={`text-black ${expand.w} ${
        expand.h
      } bg-light rounded-[3vw] m-[0.5vw] flex flex-col items-center p-[1.5vw] transition-all duration-300 ease-in-out shadow-[0_0px_20px_rgba(90,_90,_90,_0.3)]`}
    >
      <div className="flex items-center justify-between w-full">
        <button
          className={`p-2 rounded-full hover:bg-white transition duration-200 ${
            expand.h === "min-h-[20vw]" ? "hidden" : ""
          }`}
          onClick={handleClick}
        >
          <ChevronDefaultLeft />
        </button>
        <div className="text-center font-bold text-2xl text-gray-800 flex-1">
          {currBrief.address?.city}
        </div>
        <button
          className="p-2 rounded-full hover:bg-white transition duration-200"
          onClick={handleClose}
        >
          <X />
        </button>
      </div>

      <div className="flex overflow-hidden max-h-[20vw] rounded-[1vw] border mt-4">
        <Image
          src="/kochi.jpeg"
          width={1}
          height={1}
          className={`h-auto ${expand.w} rounded-[1vw]`}
          unoptimized
        />
      </div>

      <div className="pl-[1vw] mt-2">
        <div className="text-[2vw] font-semibold">{currBrief.name}</div>
      </div>
      <div className={`text-wrap ${expand.w=="min-w-[25vw]"?"max-w-[25vw]":"max-w-[30vw]"} text-[1vw]`}>
        {currBrief.address?.display_name}
      </div>

      <div className={`${expand.h=="min-h-[20vw]"?"hidden":""} w-full flex`}>
        <Stats currBrief={currBrief}/>
      </div>
      <div className="flex w-full">
        <button
          className={`p-2 rounded-full hover:bg-white transition duration-200 ${
            expand.h === "min-h-[98vh]" ? "hidden" : ""
          }`}
          onClick={handleClick}
        >
          <ArrowDownLeft />
        </button>
        <div className="flex-1"></div>
      </div>
    </div>
    <div className={`bg-light text-black max-h-[40vh] overflow-y-auto min-w-[28vw] text-wrap max-w-[25vw] m-[0.5vw] p-[1.5vw] rounded-[3vw] text-[1vw] 
                    ${expand.h=="min-h-[98vh]"?"hidden":""} shadow-[0_0px_20px_rgba(90,_90,_90,_0.3)]`}>
      {currBrief.gemini_summary}
    </div>
    </div>
  );
}
