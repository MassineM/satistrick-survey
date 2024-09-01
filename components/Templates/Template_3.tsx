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
import Progressdots from "../Ui/progressdots";

const STATIC_QUESTIONS = [
  LanguageQuestionCard,
  GenderQuestionCard,
  AgeQuestionCard,
];

function Template_3() {
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
    <div className="flex max-sm:flex-col relative justify-start min-h-screen w-full">
      <img
        loading="lazy"
        src={
          campaign?.image_path ||
          "/images/dashboard/template/bg-image-template.png"
        }
        alt=""
        className={`object-cover max-sm:h-[30vh] sm:min-h-100% sm:w-[50%] z-0 ${
          currentQuestion === questions.length - 1 && "max-sm:hidden"
        }`}
      />

      <main
        className={`flex h-[70vh] sm:min-h-screen sm:h-fit sm:w-[50%] flex-col z-10 items-center sm:items-start bg-gray-100 sm:bg-custom-ivory ${
          currentQuestion === questions.length - 1 && "max-sm:h-screen"
        }`}
      >
        <div className="max-sm:h-full py-4 lg:ml-4 sm:my-auto w-full px-3 max-w-[500px]">
          <CurrentQuestion
            setCurrentQuestion={setCurrentQuestion}
            className={`sm:items-start mb-9 max-md:mb-32 ${
              currentQuestion === questions.length - 1 &&
              "max-sm:h-screen max-sm:justify-center"
            }`}
            legendClassName="absolute max-sm:h-[30vh] px-2 sm:pl-20 w-full sm:h-full sm:w-1/2 bg-slate-800/60 left-0 top-0 flex justify-center items-center text-center sm:text-start text-white"
            reactsType={2}
          />
        </div>
        {currentQuestion <= questions.length - 3 && (
          <Progressdots
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
      </main>
    </div>
  );
}

export default Template_3;
