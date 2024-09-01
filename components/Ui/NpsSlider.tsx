import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}
function NPSSlider({ value, onChange }: Props) {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [sliderThumbPosition, setSliderThumbPosition] = useState(0);
  useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const max = parseInt(slider.max, 10);
      const min = parseInt(slider.min, 10);
      const percent = ((value - min) / (max - min)) * 100;
      const thumbOffset =
        percent * (slider.offsetWidth / 100) + slider.offsetLeft;
      setSliderThumbPosition(thumbOffset);
    }
  }, [value]);
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };
  return (
    <div className="relative flex justify-center w-full">
      <div
        className={`absolute -top-2 -translate-x-1/2 -translate-y-full bg-slate-200 px-1 rounded-md`}
        style={{ left: sliderThumbPosition }}
      >
        {value}
      </div>
      <input
        ref={sliderRef}
        type="range"
        min="0"
        max="10"
        value={value !== null ? value : 5} // Default to 5 if value is null
        onChange={handleSliderChange}
        className="rangeInput mx-auto w-full"
      />
    </div>
  );
}
export default NPSSlider;
