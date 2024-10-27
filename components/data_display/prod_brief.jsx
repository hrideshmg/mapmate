"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ArrowDownLeft from "../svg/expand_arrow";
import ChevronDefaultLeft from "../svg/contract_arrow";
import X from "../svg/x";
import Link from "next/link";

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
    <div
      className={`absolute z-[500] text-black ${expand.w} ${
        expand.h
      } bg-light rounded-[3vw] m-[0.5vw] flex flex-col p-[1.5vw] ${
        open ? "" : "hidden"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between">
        <button
          className={`p-2 rounded-full hover:bg-gray-200 transition duration-200 ${
            expand.w === "min-h-[98vh]" ? "hidden" : ""
          }`}
          onClick={handleClick}
        >
          <ChevronDefaultLeft />
        </button>
        <div className="text-center font-bold text-2xl text-gray-800">
          {currBrief.address?.city}
        </div>
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
          onClick={handleClose}
        >
          <X />
        </button>
      </div>

      <div className="flex overflow-hidden max-h-[20vw] rounded-[1vw] border border-gray-300 mt-4">
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
        {currBrief.address?.display_name}2
      </div>
      <div className="flex flex-wrap justify-between mt-4">
        {/* <div className="w-[48%] bg-blue-200 rounded-lg p-4 text-center">
          <div className="font-bold">Quality Index 1</div>
          <div className="text-lg">Value: 75</div>
        </div>
        <div className="w-[48%] bg-green-200 rounded-lg p-4 text-center">
          <div className="font-bold">Quality Index 2</div>
          <div className="text-lg">Value: 85</div>
        </div>
        <div className="w-[48%] bg-yellow-200 rounded-lg p-4 text-center">
          <div className="font-bold">Quality Index 3</div>
          <div className="text-lg">Value: 90</div>
        </div>
        <div className="w-[48%] bg-red-200 rounded-lg p-4 text-center">
          <div className="font-bold">Quality Index 4</div>
          <div className="text-lg">Value: 65</div>
        </div> */}
      </div>
      {/* {expand.h === "min-h-[98vh]" && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-lg">hELLO WORLD</p>
        </div>
      )} */}

      <button
        className={`p-2 rounded-full hover:bg-gray-200 transition duration-200 ${
          expand.h === "min-h-[98vh]" ? "hidden" : ""
        }`}
        onClick={handleClick}
      >
        <ArrowDownLeft />
      </button>
    </div>
  );
}
