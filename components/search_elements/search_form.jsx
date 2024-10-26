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
// axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'

export default function SearchForm() {
  const router = useRouter();
  const { _, setCoords } = useCoords();
  const [state, setState] = useState({
    location: '',
    desc: ''
  });

  const handleBlur = async (e) => {
    const coords = await getCoordinates(e.target.value)
    setCoords(coords);
    await triggerGeoFusion(coords, 10000);
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
    const payload = {
      location: state.location,
    };
    axios
      .post(API_BASE_URL + "/scrape-cars/", payload)
      .then(function(response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          //console.log(response.data)
          // localStorage.setItem(ACCESS_TOKEN_NAME,JSON.stringify(response.data.cars));
          // localStorage.setItem(ACCESS_FILTER, JSON.stringify(state))
          redirectToMap();
        }
        // else if(response.code === 204){
        //     props.showError("Username and password do not match");
        // }
        else {
          // alert("Username does not exists");
          console.log(response.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    //axios post
  };
  const redirectToMap = () => {
    router.push("/map");
  };
  return (
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
            required
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
  );
}
