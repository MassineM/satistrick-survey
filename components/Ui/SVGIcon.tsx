import { addAlpha } from "@/lib/utils";

export default function SVGIcon({ color }: { color: string }) {
  return (
    <div
      style={{ backgroundColor: addAlpha(color, 0.17) }}
      className="w-10 h-10 rounded-full grid place-items-center"
    >
      <svg
        width="12"
        height="22"
        viewBox="0 0 12 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.843 11.2646C6.07342 11.2646 6.26021 11.4197 6.26021 11.611V21.6537C6.26021 21.845 6.07342 22 5.843 22C5.61258 22 5.42578 21.845 5.42578 21.6537V11.611C5.42578 11.4197 5.61258 11.2646 5.843 11.2646Z"
          fill="#556080"
        />
        <path
          d="M5.84103 11.6821C9.06694 11.6821 11.6821 9.06694 11.6821 5.84103C11.6821 2.61512 9.06694 0 5.84103 0C2.61512 0 0 2.61512 0 5.84103C0 9.06694 2.61512 11.6821 5.84103 11.6821Z"
          fill={`${addAlpha(color, 1)}`}
          // "#D44E5C"
        />
      </svg>
    </div>
  );
}
