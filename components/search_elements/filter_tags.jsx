export default function FilterTags(){
    const tags = ["Alpha", "Beta", "Gamma", "Delta", "Sale"];
    return(
        <div>
            {/* <p className="text-black text-[1vw]">Tags applied:</p> */}
            <div className="flex flex-wrap gap-[0.2vw] my-[0.5vw]">
                {tags.map((tag, index) => (
                <span
                    key={index}
                    className="text-[1vw] px-[1vw] py-[1vw] rounded-full text-sm transition duration-300 ease-in-out bg-[#D2B48C] text-white hover:bg-[#5B3A29]"
                >
                    {tag}
                </span>
                ))}
            </div>
        </div>
    )
}