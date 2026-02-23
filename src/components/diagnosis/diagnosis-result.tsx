import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";

interface TopAnswer {
  questionTitle: string;
  answerText: string;
  points: number;
  topic: string;
};

interface DiagnosisResult {
  percentage: number;
  topAnswers: TopAnswer[];
};

const MESSAGES: { min: number; max: number; text: string }[] = [
  {
    min: 70,
    max: 89,
    text: "まずは『はじめまして』から。\n話せば話すほど、数字が上がっていく予感がします！",
  },
  {
    min: 90,
    max: 109,
    text: "中山のこだわり、分かっちゃいましたね？\n明日は一緒に何を食べましょうか。",
  },
  {
    min: 110,
    max: 129,
    text: "波長が合いすぎて、初対面な気がしません。\nとりあえずハイタッチしに来てください！",
  },
  {
    min: 130,
    max: 150,
    text: "計測不能！中山のおもちゃ箱に、\nあなたという新しい宝物が増えた気分です。",
  },
];

function getMessage(percentage: number): string {
  const match = MESSAGES.find(
    (m) => percentage >= m.min && percentage <= m.max
  );
  return match?.text ?? "";
}

export function DiagnosisResult() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("diagnosisResult");
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) {
    return null;
  }

  const message = getMessage(result.percentage);

  return (
    <div className="flex flex-col items-center gap-24 w-185 mx-auto mt-16 pb-45">
      <div className="relative w-222 h-120 bg-[url('/images/diagnosis/result-bg.svg')] bg-center bg-no-repeat">
        <div className="absolute -top-18 left-1/2 -translate-x-1/2 flex items-start justify-center pt-3 w-121 h-27 bg-[url('/images/diagnosis/diagnosis-title.png')] bg-center bg-no-repeat mx-auto mt-14 mb-4">
          <h1 className="text-soft-black heading-zenmaru-32">
            診断結果
          </h1>
        </div>
        <div className="flex flex-col items-center mt-36">
          <p className="heading-zenmaru-24 text-soft-black">あなたと中山さんの相性は•••</p>
          <p className="text-[150px] leading-30 font-zenmaru font-bold text-turquoise-blue-700 [-webkit-text-stroke:8px_#F9F7F4] [paint-order:stroke_fill]">
            {result.percentage}
            <span className="text-[90px]">%</span>
          </p>
        </div>
        <p className="heading-zenmaru-20 mt-6 text-soft-black text-center whitespace-pre-wrap">
          {message}
        </p>
        <img 
          src="/images/global/katamimi-usagi.png" 
          alt=""
          className="absolute top-24 left-32 -rotate-20"
        />
      </div>

      <div className="relative w-full rounded-3xl border-3 border-rich-black bg-[#FAF5EF] px-10 pt-8 pb-6">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center">
          <span className="inline-block rounded-full border-3 border-rich-black bg-[#FAF5EF] px-20 py-8 heading-zenmaru-24 text-[#43362E] whitespace-nowrap">
            盛り上がりやすそうな話題
          </span>
        </div>
        <div className="flex flex-col mt-8">
          {result.topAnswers.map((answer, i) => (
            <div key={i}>
              <p className="heading-zenmaru-20 text-center text-[#43362E] py-5 px-2">
                {answer.topic}
              </p>
              {i < result.topAnswers.length - 1 && (
                <hr className="border-dashed border-[#C5B4A5]" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-[#EDE5DA] px-6 py-4 text-center">
          <p className="body-16-bold text-[#563221]">
            気になる話題は見つかりましたか？
            <br />
            リラックスして、楽しく会話を楽しんでくださいね！
          </p>
        </div>
      </div>

      <div className="flex gap-10">
        <a
          href="/diagnosis/"
          className="relative flex items-center justify-center w-90 h-16 mx-auto body-16-bold bg-off-white border-3 border-turquoise-blue-500 text-turquoise-blue-500 rounded-full"
        >
          もう一度診断する
          <MoveRight 
            size={20}
            color="#54B9AC"
            className="absolute right-8"
          />
        </a>
        <a
          href="/"
          className="relative flex items-center justify-center w-90 h-16 mx-auto body-16-bold bg-off-white border-3 border-turquoise-blue-500 text-turquoise-blue-500 rounded-full"
        >
          TOPへもどる
          <MoveRight 
            size={20}
            color="#54B9AC"
            className="absolute right-8"
          />
        </a>
      </div>
      <span className="absolute block w-screen top-125 h-140 bg-[url('/images/global/texture/bg-texture2.svg')] bg-no-repeat bg-center bg-cover -z-10" />
      <span className="absolute block w-screen bottom-0 h-80 bg-[url('/images/global/texture/under-bg1.svg')] bg-no-repeat bg-center bg-cover -z-10" />
    </div>
  );
}
