"use client";

import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import store from "@/store";
import LanguageQuestionCard from "@/components/Questions/LangauageQuestionCard";
import GenderQuestionCard from "@/components/Questions/GenderQuestionCard";
import AgeQuestionCard from "@/components/Questions/AgeQuestionCard";
import ServiceAreaQuestion from "@/components/Questions/ServiceAreaQuestion";
import NpsSliderCard from "@/components/Questions/NpsSliderQuestionCard";
import ContactForm from "@/components/Forms/ContactForm";
import ContactInfoCard from "@/components/Cards/ContactInfoCard";
import Progressbar_2 from "../Ui/progressbar_2";

const STATIC_QUESTIONS = [
  LanguageQuestionCard,
  GenderQuestionCard,
  AgeQuestionCard,
];

function Template_4() {
  const { campaign } = useSnapshot(store);
  const { answers } = useSnapshot(store);
  const [currentQuestion, setCurrentQuestion] = useState(() => 0);

  const [questions, setQuestions] = useState(STATIC_QUESTIONS);

  useEffect(() => {
    const serviceAreas = campaign?.service_areas;
    setQuestions(() => [
      ...STATIC_QUESTIONS,
      ...(serviceAreas || [])?.map((serviceArea) => {
        return (props: any) => (
          <ServiceAreaQuestion serviceArea={serviceArea} {...props} />
        );
      }),
      NpsSliderCard,
      ContactForm,
      ContactInfoCard,
    ]);
  }, [currentQuestion]);

  const CurrentQuestion = questions[currentQuestion];

  return (
    <div className="flex flex-col relative justify-between items-center min-h-screen w-full">
      <img
        loading="lazy"
        src={
          campaign?.image_path ||
          "/images/dashboard/template/bg-image-template.png"
        }
        alt=""
        className="object-cover absolute size-full"
      />

      <div className="absolute min-h-screen h-full w-screen z-10 bg-gray-100/75"></div>
      <main className="z-50 flex flex-col w-full max-w-[572px]">
        <CurrentQuestion
          setCurrentQuestion={setCurrentQuestion}
          className="h-fit pt-[15vh] px-4 justify-between mb-4"
          reactsType={2}
        />
      </main>
      {currentQuestion <= questions.length - 3 && (
        <Progressbar_2
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          disabled={
            currentQuestion > 2 &&
            !answers?.service_areas?.find(
              (area) =>
                area.id === campaign?.service_areas?.[currentQuestion - 3]?.id
            )
          }
        />
      )}
    </div>
  );
}

export default Template_4;
