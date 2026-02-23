import questions from "../../../data/diagnosis-question.json";
import { MoveRight } from "lucide-react";

export function DiagnosisQuestions() {
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
            <h2>
              {question.title}
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {question.options.map((option, i) => (
              <button
                key={i}
                className="inline-flex justify-start items-center gap-12 heading-zenmaru-20 text-soft-black"
              >
                <input
                  type="checkbox"
                  id={`option-${i}`}
                  className="
                    appearance-none w-7 h-7 bg-[url('/images/diagnosis/quiz-option.svg')] bg-center bg-no-repeat bg-contain
                    checked:bg-[url('/images/diagnosis/quiz-option-checked.svg')]
                  "
                />
                <label 
                  htmlFor={`option-${i}`}
                >
                  {option}
                </label>
              </button>
            ))}
          </div>
        </div>
      ))}
      <a 
        href="/diagnosis/"
        className="relative flex items-center justify-center w-90 h-16 mx-auto heading-zenmaru-20 bg-off-white border-3 border-turquoise-blue-500 text-turquoise-blue-500 rounded-full"
      >
        結果を見る
        <MoveRight 
          size={24}
          color="#54B9AC"
          className="absolute right-10"
        />
      </a>
    </div>
  )
}