import store from "@/store";
import React from "react";
import { useSnapshot } from "valtio";
import FaceRatingCard from "./FaceRatingCard";
import StarRatingCard from "./StarRatingCard";
import { ServiceArea } from "@/types/types";

interface Props {
  serviceArea: ServiceArea;
  reactsType?: number;
}

function RatingCard({ serviceArea, reactsType }: Props) {
  const { campaign } = useSnapshot(store);
  const ratingType = campaign?.rating_type;
  return (
    <div>
      {ratingType === 1 ? (
        <FaceRatingCard serviceArea={serviceArea} reactsType={reactsType} />
      ) : (
        <StarRatingCard serviceArea={serviceArea} reactsType={reactsType} />
      )}
    </div>
  );
}

export default RatingCard;
