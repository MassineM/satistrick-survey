"use client";

import { cn } from "@/lib/utils";
import store from "@/store";
import { Language, Locale } from "@/types/types";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import SVGIcon from "../Ui/SVGIcon";

interface Props {
  className?: string;
  legendClassName?: string;
}

export default function LanguageQuestionCard({
  className,
  legendClassName,
}: Props) {
  const { campaign, answers } = useSnapshot(store);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    campaign?.languages?.[0] as Language
  );

  useEffect(() => {
    if (selectedLanguage) {
      store.answers = {
        ...store.answers,
        language: {
          id: selectedLanguage.id,
          value: selectedLanguage.iso_code as Locale,
        },
      };
    }

    localStorage.setItem("campaign", JSON.stringify(campaign));
  }, [selectedLanguage?.id]);

  useEffect(() => {
    if (answers.language?.id) {
      setSelectedLanguage(
        campaign?.languages?.find(
          (language) => language.id === answers.language?.id
        ) as Language
      );
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
        Select your language
      </legend>
      <fieldset className="mt-9 w-full">
        <div className="sr-only">Language options</div>
        {campaign?.languages?.map((option, index) => (
          <div
            onClick={() => setSelectedLanguage(option as Language)}
            key={index}
            className={index > 0 ? "mt-6" : ""}
          >
            <div
              className={`flex gap-5 justify-between px-5 py-2.5 w-full rounded-lg border-2 border-solid ${
                selectedLanguage?.id === option.id ? "bg-stone-50" : "bg-white"
              } border-zinc-100`}
            >
              <div className="flex gap-4 text-xl font-medium whitespace-nowrap text-blue-950 text-opacity-70">
                <SVGIcon color={`#${option.color}`} />
                <div className="my-auto">{option.name}</div>
              </div>
              <div className="flex flex-col justify-center p-1.5 my-auto rounded-full border-2 border-solid border-zinc-300 border-opacity-60">
                <div
                  className={`shrink-0 rounded-full h-[21px] w-[21px] ${
                    selectedLanguage?.id === option.id
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
