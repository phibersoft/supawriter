import { FC } from "react";

type WriterResultProps = {
  correctLetterCount: number;
  correctWordCount: number;
  show: boolean;
};

export const WriterResult: FC<WriterResultProps> = ({ correctLetterCount, correctWordCount, show }) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-bold backdrop-blur-sm transform transition-transform duration-300 ${
        !show && "translate-y-full"
      }`}
    >
      {correctLetterCount > 0
        ? `${correctLetterCount} letters (${correctWordCount} words) typed correctly, awesome!`
        : "0 letters typed correctly, keep practicing!"}
    </div>
  );
};
