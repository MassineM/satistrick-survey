"use client";

import { cn } from "@/lib/utils";

const ReactionImage: React.FC<{
  src: string;
  alt: string;
  label?: string;
  selected: boolean;
  display?: boolean;
  reactsType?: number;
}> = ({ src, alt, label, selected, display, reactsType }) =>
  reactsType !== 3 ? (
    <div className="flex flex-col pb-1.5 mt-2 items-center ">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className={cn(
          "self-center aspect-square w-[36px]",
          !selected && !display && "grayscale",
          reactsType === 2 && "sm:bg-white sm:rounded-lg sm:p-4 sm:size-16",
          reactsType === 2 &&
            selected &&
            "sm:border-2 sm:border-solid sm:border-gray-400"
        )}
      />
      {label && (
        <div
          className={cn(
            "w-16 mt-2 text-gray-400 text-xs text-center",
            reactsType === 2 && "sm:hidden"
          )}
        >
          {label}
        </div>
      )}
    </div>
  ) : (
    <div
      className={`flex gap-5 justify-between px-5 py-2.5 w-full rounded-lg border-2 border-solid ${
        selected ? "bg-stone-50" : "bg-white"
      } border-zinc-100`}
    >
      <div className="flex gap-4 text-xl font-medium whitespace-nowrap text-blue-950 text-opacity-70">
        <div className="my-auto">{label}</div>
      </div>
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className={cn(
          "self-center aspect-square w-[36px]",
          !selected && !display && "grayscale"
        )}
      />
    </div>
  );

export default ReactionImage;
