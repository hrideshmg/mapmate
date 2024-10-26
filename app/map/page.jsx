"use client";

import ProductBrief from "@/components/data_display/prod_brief";
import Map from "@/components/map_elements/map";
import SampleResults from "@/components/search_elements/results";
import SearchBar from "@/components/search_elements/search_bar";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ACCESS_FILTER, ACCESS_TOKEN_NAME } from "../_constants/constants";

export default function MapsTest() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([
    {
      url: "https://www.cars24.com/buy-used-hyundai-eon-2016-cars-kochi-13036881709/",
      status: "success",
      data: {
        city: "Kochi",
        state: "Kerala",
        country: "India",
        address: {
          city: "Kochi",
          county: "Kochi",
          state_district: "Ernakulam",
          state: "Kerala",
          "ISO3166-2-lvl4": "IN-KL",
          postcode: "682001",
          country: "India",
          country_code: "in",
        },
        location: {
          type: "Point",
          coordinates: [51.26022, 9.93988],
        },
        current: {
          pollution: {
            ts: "2024-10-26T05:00:00.000Z",
            aqius: 93,
            mainus: "p2",
            aqicn: 47,
            maincn: "p1",
          },
          weather: {
            ts: "2024-10-26T06:00:00.000Z",
            tp: 29,
            pr: 1011,
            hu: 69,
            ws: 2.51,
            wd: 221,
            ic: "03d",
          },
          geography: {
            river_discharge: 234.345,
            water_lvl: 214.22,
            elevation: 4326.43,
            land_cover: 345.22,
            infrastructure: "agriculture",
            historical_floods: 3,
            floods_occured: 2,
          },
        },
      },
    },
  ]);
  const [inter, setInter] = useState();
  const [currBrief, setCurrBrief] = useState({});
  const [currIndex, setCurrIndex] = useState(null);
  const [focusPos, setFocusPos] = useState(null);

  useEffect(() => {
    if (currIndex != null) {
      setCurrBrief(data[currIndex]);
    }
  }, [currIndex]);

  useEffect(() => {
    if (data.length > 0) {
      setFocusPos(data[0]);
    }
  }, [data]);

  return (
    <div className="flex-1 flex">
      <div className="bg-light flex-1 h-screen flex flex-col p-[1vw]">
        <div className="text-black text-[3vw] tracking-tighter font-semibold">
          URBANALYZE
        </div>
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="flex-1">
          <SampleResults
            open={open}
            setOpen={setOpen}
            data={data}
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
              data={data}
              focusPos={focusPos}
              setFocusPos={setFocusPos}
              setData={setData}
            />
          )}
        </div>
        <ProductBrief open={open} setOpen={setOpen} currBrief={currBrief} />
      </div>
    </div>
  );
}
