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
import Progressbar from "../Ui/progressbar";

const STATIC_QUESTIONS = [
  LanguageQuestionCard,
  GenderQuestionCard,
  AgeQuestionCard,
];

function Template_2() {
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
    <div className="flex flex-col sm:flex-row-reverse relative justify-start min-h-screen w-full">
      <img
        loading="lazy"
        src={
          campaign?.image_path ||
          "/images/dashboard/template/bg-image-template.png"
        }
        alt=""
        className={`object-cover max-sm:h-[25vh] sm:min-h-100% sm:w-[35%] z-0 ${
          currentQuestion === questions.length - 1 && "max-sm:hidden"
        }`}
      />

      <main className="flex h-[75vh] sm:min-h-screen sm:h-fit sm:w-[70%] flex-col z-10 items-center sm:items-start bg-custom-ivory">
        <div className="max-sm:h-[60vh] py-4 lg:ml-10 my-auto w-full px-3 max-w-[572px]">
          <CurrentQuestion
            setCurrentQuestion={setCurrentQuestion}
            className="sm:items-start"
            legendClassName="sm:text-start"
          />
        </div>
        {currentQuestion <= questions.length - 3 && (
          <Progressbar
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

export default Template_2;
