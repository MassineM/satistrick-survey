import { API } from "@/lib/swr";
import { translation } from "@/lib/utils";
import store from "@/store";
import { SetState } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSnapshot } from "valtio";

interface Props {
  totalQuestions: number;
  currentQuestion: number;
  setCurrentQuestion: SetState<number>;
  disabled?: boolean;
  className?: string;
}

function NextButton({
  totalQuestions,
  currentQuestion,
  setCurrentQuestion,
  disabled,
  className,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { answers } = useSnapshot(store);

  const searchParams = useSearchParams();
  const shortcode = searchParams.get("shortcode");
  const qrcode_id = searchParams.get("qrcode_id");

  const getCampaignWithLanguage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API}/campaigns/byshortcode/${shortcode}?qrcode_id=${qrcode_id}&lang=${answers?.language?.value}`
      );

      if (response.ok) {
        const data = await response.json();
        store.campaign = data.campaign;
        localStorage.setItem("campaign", JSON.stringify(data.campaign));
        setCurrentQuestion((p) => p + 1);
        console.log("Campaign with language", data.campaign);
      }
    } catch (error) {
      console.log("Error fetching campaign with language", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion === 2) {
      getCampaignWithLanguage();
    } else {
      setCurrentQuestion((p) => p + 1);
    }
  };

  return (
    <button
      disabled={(disabled || loading) && currentQuestion !== totalQuestions - 3}
      onClick={() => handleNext()}
      className={`justify-center disabled:cursor-not-allowed disabled:bg-slate-800/60 hover:bg-slate-800/90 items-center self-center px-16 py-4 max-w-full text-xl font-semibold h-fit text-center whitespace-nowrap rounded-lg bg-slate-800 text-stone-50 sm:w-[209px] ${className}`}
    >
      {loading
        ? "Loading..."
        : currentQuestion > 0
        ? translation.next_button[answers?.language?.value || "us"]
        : "Next"}
    </button>
  );
}

export default NextButton;
