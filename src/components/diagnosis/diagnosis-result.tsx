import { useEffect, useState } from "react";

type TopAnswer = {
  questionTitle: string;
  answerText: string;
  points: number;
  topic: string;
};

type DiagnosisResult = {
  percentage: number;
  topAnswers: TopAnswer[];
};

const MESSAGES: { min: number; max: number; text: string }[] = [
  {
    min: 70,
    max: 89,
    text: "まずは『はじめまして』から。話せば話すほど、数字が上がっていく予感がします！",
  },
  {
    min: 90,
    max: 109,
    text: "中山のこだわり、分かっちゃいましたね？ 明日は一緒に何を食べましょうか。",
  },
  {
    min: 110,
    max: 129,
    text: "波長が合いすぎて、初対面な気がしません。とりあえずハイタッチしに来てください！",
  },
  {
    min: 130,
    max: 150,
    text: "計測不能！中山のおもちゃ箱に、あなたという新しい宝物が増えた気分です。",
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
    <div className="flex flex-col items-center gap-16 w-185 mx-auto pb-45">
      <div className="flex flex-col items-center gap-6">
        <p className="heading-zenmaru-24 text-soft-black">あなたと中山の相性は</p>
        <p className="heading-zenmaru-64 text-turquoise-blue-500">
          {result.percentage}%
        </p>
      </div>
      <p className="heading-zenmaru-20 text-soft-black text-center whitespace-pre-wrap">
        {message}
      </p>

      {/* 盛り上がりやすそうな話題 */}
      <div className="w-full rounded-3xl border-2 border-[#C5B4A5] bg-[#FAF5EF] px-10 pt-8 pb-6">
        <div className="flex justify-center mb-8">
          <span className="inline-block rounded-full border-2 border-[#C5B4A5] bg-[#FAF5EF] px-8 py-2 heading-zenmaru-20 text-[#43362E] whitespace-nowrap">
            盛り上がりやすそうな話題
          </span>
        </div>
        <div className="flex flex-col">
          {result.topAnswers.map((answer, i) => (
            <div key={i}>
              <p className="heading-zenmaru-20 text-[#43362E] py-5 px-2">
                {answer.topic}
              </p>
              {i < result.topAnswers.length - 1 && (
                <hr className="border-dashed border-[#C5B4A5]" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-[#EDE5DA] px-6 py-4 text-center">
          <p className="heading-zenmaru-16 text-[#43362E]">
            気になる話題は見つかりましたか？
            <br />
            リラックスして、楽しく会話を楽しんでくださいね！
          </p>
        </div>
      </div>

      <a
        href="/diagnosis/"
        className="relative flex items-center justify-center w-90 h-16 mx-auto heading-zenmaru-20 bg-off-white border-3 border-turquoise-blue-500 text-turquoise-blue-500 rounded-full"
      >
        もう一度診断する
      </a>
    </div>
  );
}
