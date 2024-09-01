"use client";

import store, { Store } from "@/store";
import { Locale, ServiceArea } from "@/types/types";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import ReactionImage from "../ReactionImage";
import { Textarea } from "../Ui/textarea";
import { translation } from "@/lib/utils";

interface Props {
  serviceArea: ServiceArea;
  reactsType?: number;
}

const starIcon = "/images/icons/single-star.svg";

function StarRatingCard({ serviceArea, reactsType }: Props) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const { answers } = useSnapshot(store);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedRating !== null) {
      const serviceAreas: Store["answers"]["service_areas"] = JSON.parse(
        JSON.stringify(answers?.service_areas || [])
      );

      const currentServiceArea = serviceAreas?.findLastIndex(
        (area) => area.id === serviceArea.id
      );

      // * Update the rating for the service area & make sure it's unique
      if (currentServiceArea !== -1) {
        serviceAreas![currentServiceArea as number] = {
          id: serviceArea.id,
          value: selectedRating + 1,
          message: message,
        };

        store.answers.service_areas = [...(serviceAreas || [])];
      } else {
        store.answers.service_areas = [
          ...(serviceAreas || []),
          {
            id: serviceArea.id,
            value: selectedRating + 1,
            message: message,
          },
        ];
      }
    }
  }, [selectedRating, message]);

  useEffect(() => {
    const serviceAreas: Store["answers"]["service_areas"] = JSON.parse(
      JSON.stringify(answers?.service_areas || [])
    );

    const currentServiceArea = serviceAreas?.find(
      (area) => area.id === serviceArea.id
    );

    if (currentServiceArea) {
      setSelectedRating(currentServiceArea.value - 1);
      setMessage(currentServiceArea.message);
    }
  }, []);

  return (
    <div
      className={`${
        reactsType !== 3
          ? "grid grid-cols-5 gap-5 leading-5 text-stone-400 text-center"
          : "flex flex-col leading-5 text-stone-400 gap-5"
      }`}
    >
      {translation.reactions.map((reaction, index) => (
        <button type="button" onClick={() => setSelectedRating(index)}>
          <ReactionImage
            key={index}
            src={starIcon}
            label={
              reactsType === 3
                ? reaction.label[answers.language?.value as Locale]
                : undefined
            }
            selected={selectedRating === index}
            display={selectedRating ? selectedRating > index : false}
            alt={reaction.alt}
            reactsType={reactsType}
          />
        </button>
      ))}

      {selectedRating !== null && Number(selectedRating) + 1 <= 3 && (
        <div className="mt-5 w-full col-span-full">
          <label className="text-gray-400">message: </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent"
            placeholder="Type your message here."
          />
        </div>
      )}
    </div>
  );
}

export default StarRatingCard;
