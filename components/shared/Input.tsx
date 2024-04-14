import { FC, InputHTMLAttributes } from "react";

import { globalKeyboard } from "@/components/Keyboard";

type InputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({ onFocus, onBlur, onKeyDown, className = "", ...props }) => {
  const _onFocus: typeof onFocus = (event) => {
    globalKeyboard.stopAnimation();

    if (onFocus) {
      onFocus(event);
    }
  };

  const _onBlur: typeof onBlur = (event) => {
    globalKeyboard.startAnimation();

    if (onBlur) {
      onBlur(event);
    }
  };

  const _onKeyDown: typeof onKeyDown = (event) => {
    // Special solution for Unidentified key problem of mobile keyboards
    if (event.key === "Unidentified") {
      setTimeout(() => {
        const inputValue = (event.target as HTMLInputElement).value;
        const key = inputValue.charAt(inputValue.length - 1).toLowerCase();

        globalKeyboard.highlightKey(key);
      }, 0);
    } else {
      globalKeyboard.highlightKey(event.key);
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <input
      type={"text"}
      className={`
                bg-transparent
                border border-gray-300 rounded-md 
                max-w-[500px] w-full
                px-1 py-2 md:px-2 md:py-3 lg:px-3 lg:py-4
                m-3 lg:m-5
                text-center text-md text-white
                focus:outline-none
                placeholder-gray-600
                disabled:opacity-50
                ${className}
            `}
      onFocus={_onFocus}
      onBlur={_onBlur}
      onKeyDown={_onKeyDown}
      {...props}
    />
  );
};
