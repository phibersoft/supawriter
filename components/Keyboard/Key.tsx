import { FC } from "react";

type KeyboardKeyProps = {
  value: string;
  grow?: boolean;
};

export const KeyboardKey: FC<KeyboardKeyProps> = ({ value, grow }) => {
  return (
    <div
      className={`flex justify-center border border-gray-300 rounded-md p-0.5 m-0.5 text-xs
      lg:p-4 lg:m-1 lg:text-md
      sm:p-3 md:m-[0.7] md:text-sm
      ${grow ? "grow-[5]" : `grow`}`}
      data-keyboard-key={value}
    >
      {value}
    </div>
  );
};
