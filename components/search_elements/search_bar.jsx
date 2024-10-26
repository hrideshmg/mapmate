import MagnifyingGlass from "../svg/magnifying_glass";

export default function SearchBar(){    
    return(
        <div className="flex items-center rounded-[2vw] bg-white overflow-hidden">
            <input type="text" placeholder="Enter Location" className="w-full min-h-[4vw] rounded-l-[2vw] pl-[1vw]"></input>
            <div className="min-w-[2.2vw] text-black">
                <MagnifyingGlass/>
            </div>
        </div>
    )
}