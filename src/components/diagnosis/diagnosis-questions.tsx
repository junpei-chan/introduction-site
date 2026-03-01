import { useState } from "react";
import questions from "../../../data/diagnosis-question.json";
import { MoveRight } from "lucide-react";

type Answers = Record<number, number>; // questionId -> optionIndex (0-based)

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

function calcResult(answers: Answers): DiagnosisResult {
  const MIN_TOTAL = 8;
  const MAX_TOTAL = 32;

  let totalPoints = 0;
  const questionScores: TopAnswer[] = [];

  for (const q of questions) {
    const selectedIndex = answers[q.id];
    if (selectedIndex === undefined) continue;
    const pts = q.points[selectedIndex];
    totalPoints += pts;
    questionScores.push({
      questionTitle: q.title,
      answerText: q.options[selectedIndex],
      points: pts,
      topic: q.topics[selectedIndex],
    });
  }

  const percentage = Math.round(
    70 + ((totalPoints - MIN_TOTAL) / (MAX_TOTAL - MIN_TOTAL)) * 80
  );

  const topAnswers = [...questionScores]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  return { percentage, topAnswers };
}

export function DiagnosisQuestions() {
  const [answers, setAnswers] = useState<Answers>({});

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSelect = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    const result = calcResult(answers);
    localStorage.setItem("diagnosisResult", JSON.stringify(result));
    window.location.href = "/diagnosis/result";
  };

  return (
    <div className="flex flex-col gap-46 w-185 mx-auto pb-45">
      {questions.map((question) => (
        <div
          key={question.id}
          className="flex flex-col items-center gap-16"
        >
          <div className="flex items-center justify-center gap-8 w-full bg-off-white heading-jiyucho-24 text-soft-black py-5 rounded-full">
            <div className="flex items-end justify-start pl-3 pb-1 w-17 h-12 heading-zenmaru-24 text-[#52443B] bg-[url('/images/diagnosis/quiz-title.svg')] bg-left bg-no-repeat">
              Q{question.id} .
            </div>
            <h2>{question.title}</h2>
          </div>
          <div className="flex flex-col gap-6">
            {question.options.map((option, i) => {
              const isSelected = answers[question.id] === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(question.id, i)}
                  className="inline-flex justify-start items-center gap-12 heading-zenmaru-20 text-soft-black"
                >
                  <span
                    className={`
                      shrink-0 w-7 h-7 bg-center bg-no-repeat bg-contain
                      ${isSelected
                        ? "bg-[url('/images/diagnosis/quiz-option-checked.svg')]"
                        : "bg-[url('/images/diagnosis/quiz-option.svg')]"
                      }
                    `}
                  />
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!allAnswered}
        className="
          relative flex items-center justify-center w-90 h-16 mx-auto heading-zenmaru-20 bg-off-white border-3 border-turquoise-blue-500 text-turquoise-blue-500 rounded-full cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        結果を見る
        <MoveRight
          size={24}
          color="#54B9AC"
          className="absolute right-10"
        />
      </button>
    </div>
  );
}
