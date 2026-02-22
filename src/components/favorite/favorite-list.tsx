import { FavoriteItem } from "./favorite-item";
import MockData from "../../../data/favorites/food.json";

export function FavoriteList({title}: {title: string}) {
  return (
    <section className="w-260 mx-auto bg-white p-6 rounded-2xl">
      <div className="flex flex-col justify-center gap-12 bg-turquoise-blue-200 py-12 rounded-xl">
        <div className="flex justify-center gap-8 heading-jiyucho-24 text-gray-800">
          <img
            src="/images/favorite/title-line.svg"
            alt=""
          />
          <h2>好きな{title}</h2>
          <img
            src="/images/favorite/title-line.svg"
            alt=""
            className="rotate-180"
          />
        </div>
        <div className="inline-grid grid-cols-3 gap-8 mx-auto">
          {MockData.map((item) => (
            <FavoriteItem
              key={item.id}
              imagePath={item.imagePath}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </section>
  )
}