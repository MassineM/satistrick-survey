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

function Progressbar_2({
  currentQuestion,
  totalQuestions,
  setCurrentQuestion,
  disabled,
}: Props) {
  const percentage = (currentQuestion / totalQuestions) * 100;
  return (
    <div className="flex flex-col items-center w-full pb-10 z-20">
      <div className="flex flex-col items-center gap-2 max-md:pb-20">
        {/* "nb" of "total" */}
        <p className="text-lg text-gray-600">
          {currentQuestion + 1} of {totalQuestions}
        </p>
        <div className="relative w-[200px] md:w-[300px] lg:w-[400px] h-2 bg-gray-400 rounded-md">
          <div
            className="absolute h-full rounded-md bg-custom-yellow"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="absolute bottom-4 w-screen flex justify-between px-10">
        <Button
          variant={"outline"}
          size={"sm"}
          className="py-4 bg-white h-fit font-semibold w-1/2 mr-1 sm:w-[209px] text-xl text-gray-600 border-2 border-gray-300"
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
          className="w-1/2"
        />
      </div>
    </div>
  );
}

export default Progressbar_2;
