import { useState } from "react";
import { ButtonWithFavorite } from "./button-with-favorite";
import { FavoriteList } from "./favorite-list";

export function FavoriteSection() {
  const [favoriteGenre, setFavoriteGenre] = useState("食べもの");
  const genreButtontexts = ["食べもの", "カラー・デザイン", "ゲーム", "キャラクター", "エンタメ", "好みのタイプ", "その他"];

  const renderButtons = (buttons: string[], offset: number) =>
    buttons.map((button, i) => {
      const color = (offset + i + 1) % 2 === 0
        ? "mustard-yellow"
        : "turquoise-blue";

      return (
        <ButtonWithFavorite
          key={offset + i}
          text={button}
          color={color}
          onClick={() => handleGenreClick(button)}
        />
      );
    });

  const handleGenreClick = (title: string) => {
    if (title === "好みのタイプ") title = "タイプ";
    setFavoriteGenre(title);
  }

  return (
    <section>
      <div className="flex flex-col items-center gap-y-4 my-18">
        <div className="flex gap-x-4">
          {renderButtons(genreButtontexts.slice(0, 4), 0)}
        </div>
        <div className="flex gap-x-4">
          {renderButtons(genreButtontexts.slice(4), 4)}
        </div>
      </div>
      <FavoriteList title={favoriteGenre} />
    </section>
  )
}