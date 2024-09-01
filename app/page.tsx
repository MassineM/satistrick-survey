"use client";

import Template_1 from "@/components/Templates/Template_1";
import Template_2 from "@/components/Templates/Template_2";
import Template_3 from "@/components/Templates/Template_3";
import Template_4 from "@/components/Templates/Template_4";
import Template_5 from "@/components/Templates/Template_5";
import store from "@/store";
import { Campaign } from "@/types/types";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

type CampaignResponse = {
  status: "success";
  campaign: Campaign;
};

export default function Home() {
  const searchParams = useSearchParams();

  const shortcode = searchParams.get("shortcode");
  const qrcode_id = searchParams.get("qrcode_id");

  const { data } = useSWR<CampaignResponse>(
    [`/campaigns/byshortcode/${shortcode}?qrcode_id=${qrcode_id}`],
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        store.campaign = data.campaign;
        console.log("refetch");
        localStorage.setItem("campaign", JSON.stringify(data.campaign));
      },
    }
  );

  return (
    <>
      {(() => {
        switch (data?.campaign?.template_type) {
          case 1:
            return <Template_1 />;
          case 2:
            return <Template_2 />;
          case 3:
            return <Template_3 />;
          case 4:
            return <Template_4 />;
          case 5:
            return <Template_5 />;
          default:
            return;
        }
      })()}
    </>
  );
}
