"use client";

import { API } from "@/lib/swr";
import store from "@/store";
import { SetState } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSnapshot } from "valtio";
import NextButton from "./nextbtn";

interface Props {
  totalQuestions: number;
  currentQuestion: number;
  setCurrentQuestion: SetState<number>;
  disabled?: boolean;
}

function QuizPagination({
  totalQuestions,
  currentQuestion,
  setCurrentQuestion,
  disabled,
}: Props) {
  return (
    <div className="flex flex-col mt-4 align-middle">
      <NextButton
        totalQuestions={totalQuestions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        disabled={disabled}
      />
      <div className="flex justify-between mt-6 w-[250px]">
        {Array.from({ length: totalQuestions - 2 }).map((_, index) => {
          const isNearCurrent = Math.abs(currentQuestion - index) <= 1;
          const isFirst = index === 0;
          const isLast = index === totalQuestions - 3;

          if (totalQuestions <= 8 || isFirst || isLast || isNearCurrent) {
            return (
              <button
                disabled={currentQuestion < index}
                onClick={() => setCurrentQuestion(index)}
                key={index}
                className={`cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-black grid place-items-center ${
                  index === currentQuestion ? "font-bold" : "font-light"
                }`}
              >
                <span>{index + 1}</span>
                <hr
                  className={`bg-custom-yellow h-1 rounded-md w-8 ${
                    index > currentQuestion && "grayscale"
                  }`}
                />
              </button>
            );
          } else if (index === 1 && currentQuestion > 2) {
            return <span key="ellipsis1">...</span>;
          } else if (
            index === totalQuestions - 4 &&
            currentQuestion < index - 1
          ) {
            return <span key="ellipsis2">...</span>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default QuizPagination;
