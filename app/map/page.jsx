"use client";

import ProductBrief from "@/components/data_display/prod_brief";
import Map from "@/components/map_elements/map";
import SampleResults from "@/components/search_elements/results";
import SearchBar from "@/components/search_elements/search_bar";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ACCESS_FILTER, ACCESS_TOKEN_NAME } from "../_constants/constants";
import { useCoords } from "../_context/CoordsContext";
import Link from "next/link";
import FilterTags from "@/components/search_elements/filter_tags";


export default function MapsTest() {
  const { settlementData, setSettlementData } = useCoords();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSettlementData(JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)))
  }, [])

  const [inter, setInter] = useState();
  const [currBrief, setCurrBrief] = useState({});
  const [currIndex, setCurrIndex] = useState(null);
  const [focusPos, setFocusPos] = useState(null);

  useEffect(() => {
    if (currIndex != null) {
      setCurrBrief(settlementData[currIndex]);
    }
  }, [currIndex]);

  useEffect(() => {
    if (settlementData.length > 0) {
      setFocusPos(settlementData[0].address.location);
    }
  }, [settlementData]);

  return (
    <div className="flex-1 flex">
      <div className="bg-light flex-1 h-screen flex flex-col px-[1vw] max-h-screen overflow-y-scroll">
        <div className="text-black bg-light text-[3vw] py-[1vw] font-semibold sticky top-0">
          <Link className="tracking-tighter" href="/">URBANALYZE</Link>
          <FilterTags />
        </div>
        {/* <div className="w-full">
          <SearchBar />
        </div> */}
        <div className="flex-1">
          <SampleResults
            open={open}
            setOpen={setOpen}
            setCurrIndex={setCurrIndex}
            currIndex={currIndex}
            setFocusPos={setFocusPos}
          />
        </div>
      </div>
      <div className="bg-light flex-[3] flex justify-end">
        <div className="rounded-[3vw] bg-red-300 flex-1 overflow-hidden">
          {focusPos && ( // Ensure focusPos is available before rendering the map
            <Map
              focusPos={focusPos}
              setFocusPos={setFocusPos}
            />
          )}
        </div>
        <ProductBrief open={open} setOpen={setOpen} currBrief={currBrief} />
      </div>
    </div>
  );
}
