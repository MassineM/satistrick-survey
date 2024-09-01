"use client";

import { cn, translation } from "@/lib/utils";
import store from "@/store";
import { ResponseApi, SetState } from "@/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnapshot } from "valtio";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Ui/form";
import { Input } from "../Ui/input";
import { Button } from "../Ui/button";
import { API } from "@/lib/swr";
import { useState } from "react";

interface Props {
  setCurrentQuestion: SetState<number>;
  className?: string;
}

interface ContactFormValues {
  name: string;
  nickname: string;
  email: string;
  phone: string;
}

function ContactForm({ setCurrentQuestion, className }: Props) {
  const { answers, campaign } = useSnapshot(store);
  const [loading, setLoading] = useState(false);

  const methods = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/answerSurvey/${campaign?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: answers.age,
          gender: answers.gender,
          nps: answers.nps,
          name: values.name,
          nickname: values.nickname,
          email: values.email,
          phone: values.phone,
          answers: answers.service_areas?.map((area) => ({
            service_area_id: area.id,
            review: area.value,
            message: area.message,
          })),
        }),
      });

      const data: ResponseApi = await response.json();

      if (data.status === "success") {
        localStorage.setItem("business", JSON.stringify(data.business));
        store.business = data.business;

        setCurrentQuestion((p) => p + 1);
      } else {
        console.log("Error submitting contact form");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...methods}>
      <form
        {...methods}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("flex flex-col w-full", className)}
      >
        <h2 className="text-3xl font-bold text-slate-800">
          {translation.contact.title[answers.language?.value || "us"]}
        </h2>
        <p className="mt-2 text-base text-neutral-400 mb-6">
          {translation.contact.description[answers.language?.value || "us"]}
        </p>

        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
          <FormField
            control={methods.control}
            name="name"
            rules={{
              required:
                translation.contact.form.name.validation.required[
                  answers.language?.value || "us"
                ],
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400 text-base font-light tracking-wider">
                  {
                    translation.contact.form.name.title[
                      answers.language?.value || "us"
                    ]
                  }{" "}
                  :
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      translation.contact.form.name.placeholder[
                        answers.language?.value || "us"
                      ]
                    }
                    className="!mt-0 h-12 bg-transparent"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400 text-base font-light tracking-wider">
                  {
                    translation.contact.form.nickname.title[
                      answers.language?.value || "us"
                    ]
                  }{" "}
                  :
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      translation.contact.form.nickname.placeholder[
                        answers.language?.value || "us"
                      ]
                    }
                    className="!mt-0 h-12 bg-transparent"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="email"
            rules={{
              required:
                translation.contact.form.email.validation.required[
                  answers.language?.value || "us"
                ],
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400 text-base font-light tracking-wider">
                  {
                    translation.contact.form.email.title[
                      answers.language?.value || "us"
                    ]
                  }{" "}
                  :
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      translation.contact.form.email.placeholder[
                        answers.language?.value || "us"
                      ]
                    }
                    className="!mt-0 h-12 bg-transparent"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400 text-base font-light tracking-wider">
                  {
                    translation.contact.form.phone.title[
                      answers.language?.value || "us"
                    ]
                  }{" "}
                  :
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      translation.contact.form.phone.placeholder[
                        answers.language?.value || "us"
                      ]
                    }
                    className="!mt-0 h-12 bg-transparent"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-10 flex gap-10 justify-center">
          <Button
            type="button"
            disabled={loading}
            onClick={async () =>
              onSubmit({ name: "", nickname: "", email: "", phone: "" })
            }
            className="h-12 text-lg font-semibold w-1/2 sm:w-[209px]"
          >
            {translation.contact.form.skip[answers.language?.value || "us"]}
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 text-lg font-semibold w-1/2 sm:w-[209px]"
          >
            {translation.contact.form.submit[answers.language?.value || "us"]}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ContactForm;
