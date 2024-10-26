import { useEffect, useState } from "react";
import {
  API_BASE_URL,
  ACCESS_TOKEN_NAME,
  ACCESS_FILTER,
} from "@/app/_constants/constants";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCoords } from "@/app/_context/CoordsContext";
import { getCoordinates } from "@/app/_scripts/integrations";
import { triggerGeoFusion } from "@/app/_scripts/orchestrator";
import Link from "next/link";
// axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'

export default function SearchForm() {
  const router = useRouter();
  const { _, setCoords, settlementData, setSettlementData } = useCoords();

  const [state, setState] = useState({
    location: '',
    desc: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = async (e) => {
    const coords = await getCoordinates(e.target.value)
    setCoords(coords);
    let result = await triggerGeoFusion(coords, 10000);
    console.log(result)
    setSettlementData(result);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    //axios post
  };

  useEffect(() => {
    if (settlementData && Object.keys(settlementData).length > 0) {
      router.push('/map');
    }
  }, [settlementData, router]);
  
  const redirectToMap = () => {
    router.push("/map");
  };

  return (
    <>
      {(isLoading && isLoading!="not yet")?
      <p className="min-w-[40vw] bg-light flex justify-center items-center flex-col rounded-[2vw]">Loading....</p>:
      <form
        onSubmit={handleSubmit}
        className="min-h-[80vh] min-w-[40vw] bg-light flex justify-center items-center flex-col rounded-[2vw]"
      >
        <p className="text-[4.5vw] tracking-tighter w-[30vw] text-start font-semibold">
          ENTER
        </p>
        <br />
        <p className="font-semibold text-[4.5vw] tracking-tighter -mt-[2.7vw] w-[30vw] text-start">
          DETAILS
        </p>
        <div className="flex flex-col w-[30vw]">
          <div className="flex">
            <p className="text-[2vw] mr-[1vw]">Location:</p>
            <input
              id="location"
              placeholder="vijay nagar"
              value={state.location}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              type="text"
              className="bg-transparent w-full px-[0.5vw] text-[2vw] border border-transparent focus:border-gray-300 focus:outline-none focus:border-2"
            />
          </div>
          <div className="h-[2px] bg-black w-full mb-[0.5vw]"></div>
          <div className="flex-row">
            <p className="text-[2vw] mr-[1vw]">What are you looking for :</p>
            <textarea
              id="desc"
              placeholder="home"
              value={state.desc}
              onChange={handleChange}
              className="bg-transparent w-full px-[0.5vw] rounded-xl focus:border-b-0 text-[2vw] h-[15vh] word-wrap break-all max-w-[100%] border border-transparent focus:border-gray-300 focus:outline-none focus:border-2"
            />
          </div>

          <div className="h-[2px] bg-black w-full mb-[0.5vw]"></div>
        </div>
        <div className="flex flex-col w-[30vw]"></div>
        <div className="flex w-[30vw]">
          <div className="flex flex-col flex-1">
            <div className="flex"></div>
            <button
              type="submit"
              className="flex-1 bg-black rounded-[2vw] flex justify-center items-center mt-[1vw] w-full min-h-[4vw]"
            >
              <p className="text-white">SEARCH</p>
            </button>
          </div>
        </div>
      </form>
      }
    </>
  );
}
