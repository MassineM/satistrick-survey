"use client";

import { Locale, ServiceArea, SetState } from "@/types/types";
import RatingCard from "../Cards/RatingCard";
import { cn, translation } from "@/lib/utils";
import store from "@/store";
import { useSnapshot } from "valtio";

interface Props {
  serviceArea: ServiceArea;
  className?: string;
  legendClassName?: string;
  reactsType?: number;
}

function ServiceAreaQuestion({
  serviceArea,
  className,
  legendClassName,
  reactsType,
}: Props) {
  const { answers } = useSnapshot(store);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <legend
        className={cn(
          "text-2xl text-center font-bold text-slate-800",
          legendClassName
        )}
      >
        {translation.service_area.title[answers.language?.value as Locale]}{" "}
        {serviceArea.name} ?
      </legend>
      <fieldset className="mt-9 w-full">
        <div className="sr-only">Language options</div>

        <RatingCard serviceArea={serviceArea} reactsType={reactsType} />
      </fieldset>
    </div>
  );
}

export default ServiceAreaQuestion;
