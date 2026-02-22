interface Props {
  text: string;
  color: "turquoise-blue" | "mustard-yellow";
  onClick: () => void;
}

export function ButtonWithFavorite({ 
  text, 
  color,
  onClick,
}: Props) {
  const isBlue = color === "turquoise-blue";

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center w-40 h-11 bg-off-white text-gray-800 body-16-medium rounded-lg cursor-pointer m-1.5
        ${isBlue
          ? "shadow-[0_0_0_6px_var(--color-turquoise-blue-500),0_6px_0_6px_rgba(49,112,104,0.5)]"
          : "shadow-[0_0_0_6px_var(--color-mustard-yellow-400),0_6px_0_6px_rgba(167,165,26,0.5)]"
        }
      `}
    >
      {text}
    </button>
  );
}