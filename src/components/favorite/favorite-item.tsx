import { useState } from "react";

interface Props {
  imagePath: string;
  name: string;
}

export function FavoriteItem({
  imagePath,
  name,
}: Props) {
  const isPing = imagePath.slice(-3) === "png";
  const [isWobbling, setIsWobbling] = useState(false);

  return (
    <div className="relative w-66 h-60 pt-1 flex justify-center items-end text-center heading-jiyucho-20 text-turquoise-blue-500">
      <img
        className="absolute top-0 right-1/2 translate-x-1/2 shadow-[3px_3px_4px_0_rgba(0,0,0,0.25)] rounded-full z-10"
        src="/images/global/pin.svg"
        alt=""
      />
      <div
        className={`
          flex flex-col gap-4 w-full h-full bg-off-white px-6 py-4 shadow-[4px_4px_4px_2px_rgba(98,162,153,0.25)] hover:rotate-3 transition-all whitespace-nowrap
          ${isWobbling ? "animate-wobble" : ""}
        `}
        onMouseLeave={() => setIsWobbling(true)}
        onAnimationEnd={() => setIsWobbling(false)}
      >
        <div
          style={{ backgroundImage: `url('${imagePath}')` }}
          className={`
            w-full h-36 rounded-lg bg-no-repeat bg-center bg-cover
            ${isPing && "border-gray-500 border-2"}
          `}
        />
        <p>{name}</p>
        <svg width="100%" height="4">
          <line
            x1="0" y1="2" x2="100%" y2="2"
            stroke="#91D1C9"
            strokeWidth="3"
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}