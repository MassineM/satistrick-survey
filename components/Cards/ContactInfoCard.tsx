"use client";

import store from "@/store";
import { useSnapshot } from "valtio";
import { LuMail, LuPhone } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { cn, translation } from "@/lib/utils";
import { Locale } from "@/types/types";

interface Props {
  className?: string;
}

function ContactInfoCard({ className }: Props) {
  const { business, answers } = useSnapshot(store);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img
        loading="lazy"
        src={business?.coverUrl}
        alt="Business logo"
        className="max-w-full rounded-md object-cover aspect-square w-[162px]"
      />
      <div className="mt-4 text-2xl leading-8 text-gray-700">
        {business?.name}
      </div>
      <div className="mt-10 text-xl leading-6 text-neutral-700">
        {translation.contact.info[answers.language?.value as Locale]}:
      </div>
      <div className="flex gap-2 items-center mt-2.5 font-medium">
        <IoLocationOutline />

        <p className="flex-auto">{business?.address}</p>
      </div>

      <div className="flex gap-2 items-center mt-2.5 font-medium">
        <LuMail />
        <p className="flex-auto">{business?.email}</p>
      </div>

      <div className="flex gap-2 items-center mt-2.5 font-medium">
        <LuPhone />
        <p className="flex-auto">{business?.phone}</p>
      </div>
      <div className="mt-9 text-xl mb-4 leading-6 text-neutral-700">
        {translation.contact.social_networks[answers.language?.value as Locale]}
      </div>
      <div className="flex flex-wrap gap-6">
        <a href={business?.google_link} target="_blank">
          <img className="h-16 w-16" src="/images/icons/google.svg" />
        </a>

        <a href={business?.facebook_link} target="_blank">
          <img className="h-16 w-16" src="/images/icons/facebook.svg" />
        </a>

        <a href={business?.instagram_link} target="_blank">
          <img className="h-16 w-16" src="/images/icons/instagram.svg" />
        </a>
      </div>
    </div>
  );
}

export default ContactInfoCard;
