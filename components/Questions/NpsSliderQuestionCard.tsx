"use client";

import { useEffect, useState } from "react";
import NPSSlider from "../Ui/NpsSlider";
import { useSnapshot } from "valtio";
import store from "@/store";
import { cn, translation } from "@/lib/utils";
import { SetState } from "@/types/types";

interface Props {
  setCurrentQuestion: SetState<number>;
  className?: string;
  legendClassName?: string;
}

function NpsSliderCard({ className, legendClassName }: Props) {
  const { answers } = useSnapshot(store);
  const [value, setValue] = useState(0);

  useEffect(() => {
    store.answers.nps = value;
  }, [value]);

  useEffect(() => {
    // calculate the nps score
    const total = answers?.service_areas?.reduce((acc, serviceArea) => {
      return acc + serviceArea.value;
    }, 0) as number;

    // it should be between 0 and 10
    const nps = Math.round((total / answers.service_areas?.length!) * 2);

    setValue(nps);
  }, []);

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <div className="">
        <legend
          className={cn(
            "text-2xl text-center font-bold text-slate-800",
            legendClassName
          )}
        >
          {translation.nps.title[answers.language?.value || "us"]}
        </legend>
        <span className="text-sm text-gray-500 leading-none">
          {translation.nps.description[answers.language?.value || "us"]}
        </span>
      </div>
      <fieldset className="mt-9 w-full">
        <div className="sr-only">NPS</div>
      </fieldset>
      <NPSSlider value={value} onChange={setValue} />
    </div>
  );
}

export default NpsSliderCard;
