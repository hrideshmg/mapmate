import { useState } from "react"
import { API_BASE_URL, ACCESS_TOKEN_NAME, ACCESS_FILTER } from "@/app/_constants/constants";
import { useRouter } from "next/navigation";
import axios from "axios";
// axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'

export default function SearchForm(){
    const router = useRouter();
    const [state, setState] = useState({
        car_name: "",
        manufacture_year: "",
        mileage: "",
        fuel_type: "",
        owner: "",
        price: "",
        emi: "",
        url: '',
        image_url:'',
        location: ''
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value 
        }));
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const payload = {
            "location":state.location,
        };
        axios.post(API_BASE_URL + '/scrape-cars/', payload)
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    //console.log(response.data)
                    localStorage.setItem(ACCESS_TOKEN_NAME,JSON.stringify(response.data.cars));
                    localStorage.setItem(ACCESS_FILTER, JSON.stringify(state))
                    redirectToMap();
                }
                // else if(response.code === 204){
                //     props.showError("Username and password do not match");
                // }
                else{
                    // alert("Username does not exists");
                    console.log(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        //axios post
    }
    const redirectToMap=()=>{
        router.push('/map')
    }
    return(
        <form onSubmit={handleSubmit} className="min-h-[80vh] min-w-[40vw] bg-light flex justify-center items-center flex-col rounded-[2vw]">
            <p className="text-[4.5vw] tracking-tighter w-[30vw] text-start font-semibold">ENTER</p><br/><p className="font-semibold text-[4.5vw] tracking-tighter -mt-[2.7vw] w-[30vw] text-start">DETAILS</p>
            <div className="flex flex-col w-[30vw]">
                {/* <label>Model</label>
                <input type="text" placeholder="Model" className="w-full rounded-[2vw] min-h-[4vw] mb-[1vw]"></input>
                <input type="text" placeholder="Company" className="w-full rounded-[2vw] min-h-[4vw]"></input> */}
                <div className="flex">
                    <p className="text-[2vw] mr-[1vw]">Model</p>
                    <input id="model" 
                        //placeholder="Model"
                        value={state.password}
                        onChange={handleChange}
                        required type="text" className="bg-transparent w-full px-[0.5vw] text-[2vw]"></input>
                </div>
                <div className="h-[2px] bg-black w-full mb-[0.5vw]"></div>
                <div className="flex">
                    <p className="text-[2vw] mr-[1vw]">Maker</p>
                    <input id="maker" 
                        //placeholder="Maker"
                        value={state.password}
                        onChange={handleChange}
                        required type="text" className="bg-transparent w-full px-[0.5vw] text-[2vw]"></input>
                </div>
                <div className="h-[2px] bg-black w-full mb-[0.5vw]"></div>
            </div>
            <div className="flex flex-col w-[30vw]">
                {/* <input type="number" placeholder="mileage" className="w-full rounded-[2vw] min-h-[4vw]"></input>
                <input type="number" placeholder="location" className="w-full rounded-[2vw] min-h-[4vw] ml-[1vw]"></input> */}
                <div className="flex">
                    <p className="text-[2vw] mr-[1vw]">Transmission</p>
                    <input id="transmission" 
                        //placeholder="Transmission"
                        value={state.password}
                        onChange={handleChange}
                        type="text" className="bg-transparent w-full px-[0.5vw] text-[2vw]"></input>
                </div>
                <div className="h-[2px] bg-black w-full mb-[0.5vw]"></div>
            </div>
            <div className="flex w-[30vw]">
                {/* <input type="number" placeholder="cost start range" className="w-full rounded-[2vw] min-h-[4vw]"></input>
                <input type="number" placeholder="cost end range" className="w-full rounded-[2vw] min-h-[4vw]"></input> */}
                <div className="flex flex-col flex-1">
                <div className="flex">
                    <div>
                        <div className="flex">
                            <p className="text-[2vw] mr-[1vw]">Price</p>
                            <input id="max_price" 
                            //placeholder="MaxPrice"
                            value={state.password}
                            onChange={handleChange}
                            type="text" 
                            className="bg-transparent w-full px-[0.5vw] text-[2vw]"></input>
                        </div>
                        <div className="h-[2px] bg-black w-full mb-[0.5vw]"></div>
                    </div>
                    <div>
                        <div className="flex">
                            <p className="text-[2vw] mr-[1vw]">Owners</p>
                            <input id="owner_count" 
                            //placeholder="Owner Count"
                            value={state.password}
                            onChange={handleChange}
                            type="text" className="bg-transparent w-full px-[0.5vw] text-[2vw]"></input>
                        </div>
                        <div className="ml-1 rounded-[2vw] h-[2px] bg-black w-full mb-[0.5vw]"></div>
                    </div>
                    </div>
                    <div className="flex">
                        <p className="text-[2vw] mr-[1vw]">Location</p>
                        <input id="location" 
                        //placeholder="Location"
                        value={state.password}
                        onChange={handleChange}
                        type="text" 
                        className="bg-transparent w-full px-[0.5vw] text-[2vw]"></input>
                    </div>
                    <div className="h-[2px] bg-black w-full mb-[0.5vw]"></div>
                    <button type="submit" className="flex-1 bg-black rounded-[2vw] flex justify-center items-center mt-[1vw] w-full min-h-[4vw]">
                    <p className="text-white">SEARCH</p>
                </button>
                </div>
                
            </div>
            {/* <div>
                <button type="submit">Search</button>
            </div> */}
        </form>
    )
}