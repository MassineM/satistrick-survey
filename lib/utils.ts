import { Error, ResponseError } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import errorCodes from "./errors-codes.json";
import toast from "react-hot-toast";

// TODO: Remove this
export const SHORT_CODE = "2ItFBLkntHU2bvSFATL4q0mj3qkq1Apy";
export const QR_CODE_ID = 9;

export const AGE_OPTIONS = [
  { label: "18 - 25", value: "1" },
  { label: "25 - 35", value: "2" },
  { label: "35 - 45", value: "3" },
  { label: "45 +", value: "4" },
];

export const GENDER_OPTIONS = [
  { label: "Male", key: "male", value: "1", icon: "male-icon.svg" },
  { label: "Female", key: "female", value: "2", icon: "female-icon.svg" },
  { label: "Other", key: "other", value: "3", icon: "other-gender-icon.svg" },
];

export const WIN_CONFIG_OPTIONS = [
  { label: "Every 100 Person", value: "1" },
  { label: "Every 200 Person", value: "2" },
  { label: "Every 300 Person", value: "3" },
  { label: "Every 400 Person", value: "4" },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isServer = typeof window === "undefined";

export const errors: Record<number, Error> = errorCodes;

export function handleError(
  data: ResponseError,
  lang: "fr" | "en" = "fr",
  id?: string
) {
  const err = data as ResponseError;
  let error = errors[err.code];
  // if (!error?.shown) {
  //   error = errors[1];
  // }

  toast.error(error.message[lang], {
    duration: 5000,
    id,
  });
}

export function imageToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
  });
}

export function debounce(func: Function, delay: number = 300) {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function throttle(func: Function, limit: number = 300) {
  let inThrottle: boolean;
  return function (...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function addAlpha(color: string, opacity: number) {
  // coerce values so it is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

export const reactions = [
  {
    src: "/images/icons/face/angry-face.svg",
    alt: "Very disappointed icon",
    label: "Very disappointed",
  },

  {
    src: "/images/icons/face/sad-face.svg",
    alt: "Disappointed icon",
    label: "Disappointed",
  },
  {
    src: "/images/icons/face/neutral-face.svg",
    alt: "Neutral icon",
    label: "Normal",
  },
  {
    src: "/images/icons/face/smiling-face.svg",
    alt: "Satisfied icon",
    label: "Satisfied",
  },
  {
    src: "/images/icons/face/star-struck-face.png",
    alt: "Very satisfied icon",
    label: "Very satisfied",
  },
];

export function generateRandomArray() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
}

// Static Questions
export const STATIC_QUESTIONS = [
  {
    value: "language",
    type: "select",
    question: {
      us: "Select your language",
      fr: "Selectionnez votre langue",
    },
  },

  {
    value: "gender",

    question: {
      us: "What is your gender?",
      fr: "Quel est votre genre?",
    },
    type: "select",

    options: GENDER_OPTIONS,
  },

  {
    value: "age",

    question: {
      us: "What is your age?",
      fr: "Quel est votre age?",
    },
    type: "select",
    options: AGE_OPTIONS,
  },
];

export const translation = {
  next_button: {
    us: "Next",
    fr: "Suivant",
  },
  gender: {
    select_your_gender: {
      us: "Select your Gender",
      fr: "Selectionnez votre genre",
    },
    male: {
      us: "Male",
      fr: "Homme",
    },

    female: {
      us: "Female",
      fr: "Femme",
    },

    other: {
      us: "Other",
      fr: "Autre",
    },
  },

  age: {
    select_your_age: {
      us: "Select your age",
      fr: "Selectionnez votre age",
    },
  },

  service_area: {
    title: {
      us: "How to rate our service",
      fr: "Comment évaluer notre service",
    },
  },

  nps: {
    title: {
      us: "How likely are you to recommend our service to a friend or colleague?",
      fr: "Dans quelle mesure recommanderiez-vous notre service à un ami ou à un collègue?",
    },
    description: {
      us: "On a scale of 0-10, how likely are you to recommend our service to a friend or colleague?",
      fr: "Sur une échelle de 0 à 10, dans quelle mesure recommanderiez-vous notre service à un ami ou à un collègue?",
    },
  },

  contact: {
    info: {
      us: "Contact Information",
      fr: "Informations de contact",
    },
    social_networks: {
      us: "Social networks:",
      fr: "Réseaux sociaux:",
    },
    title: {
      us: "Contact Information",
      fr: "Informations de contact",
    },
    description: {
      us: "Provide your contact infos to participate in our loyalty programs",
      fr: "Fournissez vos informations de contact pour participer à nos programmes de fidélité",
    },

    form: {
      name: {
        title: {
          us: "Name",
          fr: "Nom",
        },
        placeholder: {
          us: "Enter your name",
          fr: "Entrez votre nom",
        },
        validation: {
          required: {
            us: "This field is required",
            fr: "Ce champ est requis",
          },
        },
      },
      nickname: {
        title: {
          us: "Nickname",
          fr: "Surnom",
        },
        placeholder: {
          us: "Enter your nickname",
          fr: "Entrez votre surnom",
        },

        validation: {
          required: {
            us: "This field is required",
            fr: "Ce champ est requis",
          },
        },
      },
      email: {
        title: {
          us: "Email",
          fr: "Email",
        },
        placeholder: {
          us: "Enter your email",
          fr: "Entrez votre email",
        },
        validation: {
          required: {
            us: "This field is required",
            fr: "Ce champ est requis",
          },
        },
      },
      phone: {
        title: {
          us: "Phone",
          fr: "Téléphone",
        },

        placeholder: {
          us: "Enter your phone number",
          fr: "Entrez votre numéro de téléphone",
        },

        validation: {
          required: {
            us: "This field is required",
            fr: "Ce champ est requis",
          },
        },
      },

      submit: {
        us: "Submit",
        fr: "Soumettre",
      },

      skip: {
        us: "Skip",
        fr: "Passer",
      },
    },
  },

  reactions: [
    {
      src: "/images/icons/face/angry-face.svg",
      label: {
        us: "Very disappointed",
        fr: "Très déçu",
      },
      alt: "Angry face icon",
    },
    {
      src: "/images/icons/face/sad-face.svg",
      label: {
        us: "Disappointed",
        fr: "Déçu",
      },
      alt: "Sad face icon",
    },
    {
      src: "/images/icons/face/neutral-face.svg",
      label: {
        us: "Normal",
        fr: "Normal",
      },
      alt: "Neutral face icon",
    },
    {
      src: "/images/icons/face/smiling-face.svg",
      label: {
        us: "Satisfied",
        fr: "Satisfait",
      },
      alt: "Smiling face icon",
    },
    {
      src: "/images/icons/face/star-struck-face.svg",
      label: {
        us: "Very satisfied",
        fr: "Très satisfait",
      },
      alt: "Star-struck face icon",
    },
  ],

  rating_message: {
    us: "Type your message here.",
    fr: "Tapez votre message ici.",
  },
};
