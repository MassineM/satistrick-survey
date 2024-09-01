"use client";

import { AGE_OPTIONS, cn, translation } from "@/lib/utils";
import store from "@/store";
import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  legendClassName?: string;
  reactsType?: number;
}

function AgeQuestionCard({ className, legendClassName }: Props) {
  const { answers } = useSnapshot(store);
  const [selectedAge, setSelectedAge] = useState(AGE_OPTIONS[0].value);

  useEffect(() => {
    store.answers.age = Number(selectedAge);
  }, [selectedAge]);

  useEffect(() => {
    if (answers.age) {
      setSelectedAge(answers.age.toString());
    }
  }, []);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <legend
        className={cn(
          "text-2xl text-center font-bold text-slate-800",
          legendClassName
        )}
      >
        {translation.age.select_your_age[answers?.language?.value || "us"]}
      </legend>
      <fieldset className="mt-9 w-full">
        <div className="sr-only">Age options</div>
        {AGE_OPTIONS?.map((option, index) => (
          <div
            onClick={() => setSelectedAge(option.value)}
            key={index}
            className={index > 0 ? "mt-6" : ""}
          >
            <div
              className={`flex gap-5 justify-between px-5 py-2.5 w-full rounded-lg border-2 border-solid ${
                selectedAge === option.value ? "bg-stone-50" : "bg-white"
              } border-zinc-100`}
            >
              <div className="flex gap-4 text-xl font-medium whitespace-nowrap text-blue-950 text-opacity-70">
                <div className="my-auto">{option.label}</div>
              </div>
              <div className="flex flex-col justify-center p-1.5 my-auto rounded-full border-2 border-solid border-zinc-300 border-opacity-60">
                <div
                  className={`shrink-0 rounded-full h-[21px] w-[21px] ${
                    selectedAge === option.value
                      ? "bg-amber-400"
                      : "bg-neutral-200"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

export default AgeQuestionCard;
