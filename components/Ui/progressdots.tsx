import React from "react";
import { Button } from "./button";
import { SetState } from "@/types/types";
import NextButton from "./nextbtn";
import { cn } from "@/lib/utils";

interface Props {
  totalQuestions: number;
  currentQuestion: number;
  setCurrentQuestion: SetState<number>;
  disabled?: boolean;
}

function Progressdots({
  currentQuestion,
  totalQuestions,
  setCurrentQuestion,
  disabled,
}: Props) {
  return (
    <>
      <div className="absolute max-sm:px-4 sm:py-4 max-sm:-translate-y-[200%] sm:left-10 sm:top-0 flex flex-wrap w-fit items-start sm:h-full sm:flex-col gap-2 md:gap-4 justify-center">
        {Array.from({ length: totalQuestions - 2 }).map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              disabled={currentQuestion < index}
            >
              <div
                key={index}
                className={`size-2 md:size-3 rounded-full border border-white border-solid
                                    ${
                                      currentQuestion < index
                                        ? "bg-transparent"
                                        : "bg-white"
                                    }`}
              />
            </button>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex py-10 px-3 sm:px-10 justify-evenly">
        <Button
          variant={"outline"}
          size={"sm"}
          className="py-4 bg-transparent max-sm:bg-white h-fit font-semibold w-1/2 mr-1 sm:w-[209px] text-xl text-gray-600 sm:text-white max-sm:border-2 max-sm:border-gray-300"
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
          className="max-sm:px-0 max-sm:ml-1 max-sm:w-1/2"
        />
      </div>
    </>
  );
}

export default Progressdots;
