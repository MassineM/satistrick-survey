import { isServer } from "@/lib/utils";
import { Business, Campaign, Locale, Session } from "@/types/types";
import { proxy } from "valtio";

export interface Store {
  isSidebarOpen: boolean;
  session: Session | null;
  selectedImage?: string | null;
  emoji?: boolean;
  answers: {
    // Language
    language?: {
      id: number;
      value: Locale;
    };

    // Gender
    gender?: number;

    age?: number;

    // Service Area
    service_areas?: {
      id: number;
      value: number;
      message: string;
    }[];

    // NPS
    nps?: number;
  };
  campaign:
    | (Partial<Campaign> & {
        emoji?: string;
        image?: string;
      })
    | null;

  business: Business | null;
}

const store = proxy<Store>({
  isSidebarOpen: true,
  campaign: isServer
    ? null
    : JSON.parse(localStorage.getItem("campaign") || "null"),
  session: isServer
    ? null
    : JSON.parse(localStorage.getItem("session") || "null"),
  answers: {},
  business: isServer
    ? null
    : JSON.parse(localStorage.getItem("business") || "null"),
});

export default store;
