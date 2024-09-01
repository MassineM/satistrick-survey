import React from "react";
import { Button } from "./button";
import { SetState } from "@/types/types";
import NextButton from "./nextbtn";

interface Props {
  totalQuestions: number;
  currentQuestion: number;
  setCurrentQuestion: SetState<number>;
  disabled?: boolean;
}

function Progressbar({
  currentQuestion,
  totalQuestions,
  setCurrentQuestion,
  disabled,
}: Props) {
  const percentage = (currentQuestion / totalQuestions) * 100;
  return (
    <div className="w-full bg-white h-[15vh] sm:h-1/5">
      <div className="relative w-full h-1 bg-gray-400">
        <div
          className="absolute h-full bg-custom-yellow"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex h-[90%] py-10 px-3 sm:px-10 justify-between">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="my-auto text-neutral-400 text-opacity-90 hover:bg-transparent text-xl"
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0}
        >
          Back
        </Button>
        <NextButton
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default Progressbar;
