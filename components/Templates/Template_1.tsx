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
import QuizPagination from "../Ui/pagination";

const STATIC_QUESTIONS = [
  LanguageQuestionCard,
  GenderQuestionCard,
  AgeQuestionCard,
];

function Template_1() {
  const { campaign } = useSnapshot(store);
  const { answers } = useSnapshot(store);
  const [currentQuestion, setCurrentQuestion] = useState(() => 0);

  const [questions, setQuestions] = useState(STATIC_QUESTIONS);

  useEffect(() => {
    const serviceAreas = campaign?.service_areas;
    setQuestions(() => [
      ...STATIC_QUESTIONS,
      ...(serviceAreas || [])?.map((serviceArea) => {
        return () => <ServiceAreaQuestion serviceArea={serviceArea} />;
      }),
      NpsSliderCard,
      ContactForm,
      ContactInfoCard,
    ]);
  }, [currentQuestion]);

  const CurrentQuestion = questions[currentQuestion];

  return (
    <div className="flex relative justify-center items-center min-h-screen w-full">
      <img
        loading="lazy"
        src={
          campaign?.image_path ||
          "/images/dashboard/template/bg-image-template.png"
        }
        alt=""
        className="object-cover absolute inset-0 z-0 size-full"
      />

      <main className="z-50 place-items-center flex flex-col px-5 py-10 sm:p-10 m-5 bg-white rounded-2xl border border-solid border-slate-200 w-full max-w-[572px]">
        <CurrentQuestion setCurrentQuestion={setCurrentQuestion} />
        {currentQuestion <= questions.length - 3 && (
          <QuizPagination
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

export default Template_1;
