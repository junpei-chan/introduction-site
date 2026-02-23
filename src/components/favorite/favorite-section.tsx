import { useState } from "react";
import { ButtonWithFavorite } from "./button-with-favorite";
import { FavoriteList } from "./favorite-list";

export function FavoriteSection() {
  const [favoriteGenre, setFavoriteGenre] = useState("食べもの");
  const [activeButton, setActiveButton] = useState("食べもの");
  const genreButtontexts = ["食べもの", "カラー・デザイン", "ゲーム", "キャラクター", "エンタメ", "好みのタイプ", "その他"];

  const renderButtons = (buttons: string[], offset: number) =>
    buttons.map((button, i) => (
      <ButtonWithFavorite
        key={offset + i}
        text={button}
        isActive={button === activeButton}
        onClick={() => handleGenreClick(button)}
      />
    ));

  const handleGenreClick = (button: string) => {
    setActiveButton(button);
    const title = button === "好みのタイプ" ? "タイプ" : button;
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