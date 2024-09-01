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
import { Button } from "../Ui/button";

const STATIC_QUESTIONS = [
  LanguageQuestionCard,
  GenderQuestionCard,
  AgeQuestionCard,
];

function Template_5() {
  const { campaign } = useSnapshot(store);
  const { answers } = useSnapshot(store);
  const [currentQuestion, setCurrentQuestion] = useState(() => 0);

  const [questions, setQuestions] = useState(STATIC_QUESTIONS);

  useEffect(() => {
    const serviceAreas = campaign?.service_areas;
    setQuestions(() => [
      ...STATIC_QUESTIONS,
      ...(serviceAreas || [])?.map((serviceArea) => {
        return () => (
          <ServiceAreaQuestion serviceArea={serviceArea} reactsType={3} />
        );
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

      <main className="z-50 place-items-center flex max-sm:flex-wrap justify-center gap-5 px-5 py-10 sm:p-10 m-5 bg-white rounded-2xl border border-solid border-slate-200 w-full max-w-[572px]">
        {currentQuestion <= questions.length - 3 && (
          <Button
            variant={"outline"}
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className="rounded-full py-2 px-4 focus:outline-none max-sm:order-2"
            disabled={currentQuestion === 0}
          >
            {currentQuestion}
          </Button>
        )}
        <CurrentQuestion
          setCurrentQuestion={setCurrentQuestion}
          className="max-sm:order-1"
        />
        {currentQuestion <= questions.length - 3 && (
          <Button
            variant={"outline"}
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            className="rounded-full py-2 px-4 focus:outline-none max-sm:order-3"
            disabled={
              currentQuestion > 2 &&
              currentQuestion !== questions.length - 3 &&
              !answers?.service_areas?.find(
                (area) =>
                  area.id === campaign?.service_areas?.[currentQuestion - 3]?.id
              )
            }
          >
            {currentQuestion + 2}
          </Button>
        )}
      </main>
    </div>
  );
}

export default Template_5;
