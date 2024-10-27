import Image from "next/image";
import { useCoords } from "@/app/_context/CoordsContext";

export default function SampleResults({
  open,
  setOpen,
  setCurrIndex,
  currIndex,
  setFocusPos,
}) {
  const { settlementData } = useCoords(); // Get settlementData from context
  const handleShowBrief = (index, fruit) => {
    if (open && currIndex !== undefined && index === currIndex) {
      setOpen(false);
    } else {
      setOpen(true);
      setCurrIndex(index);
      setFocusPos(fruit.address.location);
    }
  };

  return (
    <div>
      <ul className="text-black mt-[2vw]">
        {settlementData.map((fruit, index) => (
          <li>
            <button
              key={index}
              className="min-h-[8vw] flex items-center w-full"
              onClick={() => {
                handleShowBrief(index, fruit);
              }}
            >
              <div className="max-h-[7.5vw] overflow-hidden rounded-[0.5vw]">
                <Image
                  src={fruit.images?.small}
                  width={5}
                  height={5}
                  className="h-auto min-w-[7.5vw]"
                  unoptimized
                />
              </div>
              <div className="flex flex-col min-h-[7.5vw] flex-1 mx-[1vw]">
                <div className="text-start flex-1 ">
                  <p className="text-[1.1vw] leading-[1.2vw]">
                    {fruit.address.display_name}
                    {/* {fruit.address.city}, {fruit.address.state_district}, {fruit.address.country}, {fruit.address.postcode} */}
                  </p>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="flex-1"></div>
                  <p className="text-[2vw] font-semibold">{fruit.index}</p>
                </div>
              </div>
            </button>
            <div className="w-full h-0.5 bg-black rounded-[1vw] my-[1vw]"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
