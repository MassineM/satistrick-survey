import store from "@/store";
import { GenderTypeKey, Locale, SetState } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { cn, GENDER_OPTIONS, translation } from "@/lib/utils";

interface Props {
  setCurrentQuestion: SetState<number>;
  className?: string;
  legendClassName?: string;
}

function GenderQuestionCard({ className, legendClassName }: Props) {
  const { answers } = useSnapshot(store);
  const [selectedGender, setSelectedGender] = useState(GENDER_OPTIONS[0].value);

  useEffect(() => {
    if (selectedGender) {
      store.answers = {
        ...store.answers,
        gender: Number(selectedGender),
      };
    }
  }, [selectedGender]);

  useEffect(() => {
    if (answers.gender) {
      setSelectedGender(answers.gender.toLocaleString());
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
        {
          translation.gender.select_your_gender[
            answers?.language?.value || "us"
          ]
        }
      </legend>
      <fieldset className="mt-9 w-full">
        <div className="sr-only">Gender options</div>
        {GENDER_OPTIONS?.map((option, index) => (
          <div
            onClick={() => setSelectedGender(option.value)}
            key={index}
            className={index > 0 ? "mt-6" : ""}
          >
            <div
              className={`flex gap-5 justify-between px-5 py-2.5 w-full rounded-lg border-2 border-solid ${
                selectedGender === option.value ? "bg-stone-50" : "bg-white"
              } border-zinc-100`}
            >
              <div className="flex gap-4 text-xl font-medium whitespace-nowrap text-blue-950 text-opacity-70">
                <img src={`/images/icons/${option.icon}`} />
                <div className="my-auto">
                  {
                    translation.gender[option.key as GenderTypeKey][
                      answers.language?.value as Locale
                    ]
                  }
                </div>
              </div>
              <div className="flex flex-col justify-center p-1.5 my-auto rounded-full border-2 border-solid border-zinc-300 border-opacity-60">
                <div
                  className={`shrink-0 rounded-full h-[21px] w-[21px] ${
                    selectedGender === option.value
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

export default GenderQuestionCard;
