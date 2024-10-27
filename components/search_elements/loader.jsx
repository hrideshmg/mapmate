import { useCoords } from "@/app/_context/CoordsContext"

export default function Loader() {
    const { progress } = useCoords();
    var progress_len = progress.messages && progress.target_len > 0
        ? (1 - ((progress.target_len - progress.messages.length)) / progress.target_len) * 100
        : 0;
    // if (progress_len>100) {
    //     var value=progress_len/100;
    //     progress_len=progress_len-100*value;
    // }
    // console.log("Progress bar length : ",progress_len);
    const formattedProgressBar = progress_len.toFixed(2);
    return (
        <div className="flex flex-col w-[40vw] h-[10vw] rounded-xl items-end justify-center pr-6 pl-6">
            <div className="w-full rounded-full pt-[3vw] pb-4 ">
                <div className="bg-blue-600 h-[3vw] rounded-full flex items-center"
                    style={{ width: `${progress_len.toFixed(0)}%` }}
                >
                    <p className="text-[1.5vw] ml-[1vw]">{`${formattedProgressBar}%`}</p>
                </div>
            </div>
            <p className="text-start px-[0.5vw] text-[1.5vw] bg-black text-white  shadow-[0_2px_20px_rgba(0,_0,_0,_0.3)]">
                {progress.messages && progress.messages.length > 0
                    ? `${progress.messages[progress.messages.length - 1]}`
                    : "No messages available"}
            </p>
            {/* <p className="min-w-[40vw] bg-light flex justify-center items-center flex-col rounded-[2vw]">Loading....</p> */}
        </div>
    )
}
