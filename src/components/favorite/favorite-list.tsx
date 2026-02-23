import { FavoriteItem } from "./favorite-item";
import FoodData from "../../../data/favorites/food.json";
import ColorDesignData from "../../../data/favorites/color-design.json";
import GameData from "../../../data/favorites/game.json";
import CharacterData from "../../../data/favorites/character.json";
import EntertainmentData from "../../../data/favorites/entertainment.json";
import TypeData from "../../../data/favorites/type.json";
import OtherData from "../../../data/favorites/other.json";

interface Item { 
  id: number; 
  imagePath: string; 
  name: string 
};

const dataMap: Record<string, Item[]> = {
  "食べもの": FoodData,
  "カラー・デザイン": ColorDesignData,
  "ゲーム": GameData,
  "キャラクター": CharacterData,
  "エンタメ": EntertainmentData,
  "タイプ": TypeData,
  "その他": OtherData,
};

export function FavoriteList({title}: {title: string}) {
  const items = dataMap[title] ?? [];

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
          {items.map((item) => (
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
