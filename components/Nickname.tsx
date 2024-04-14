"use client";

import { FC, useState } from "react";

import { globalKeyboard } from "@/components/Keyboard";

import { useFakeTyper, useLocalStorage } from "@/hooks";

const Nickname: FC = () => {
  const placeholder = useFakeTyper(["Barry Allen", "Usain Bolt", "Sonic", "Quicksilver", "The Flash"]);
  const [nickname, setNickname] = useLocalStorage("nickname", "");
  const [focused, setFocused] = useState(false);

  return (
    <div className={"flex flex-col items-center"}>
      <label htmlFor={"nickname"} className={"text-md font-bold md:text-lg lg:text-2xl"}>
        How do slow people address you?
      </label>
      <input
        id={"nickname"}
        type={"text"}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onKeyDown={(e) => {
          globalKeyboard.highlightKey(e.key);
        }}
        className={`bg-transparent border border-gray-300 rounded-md 
        px-3 py-5 m-2 w-full max-w-[500px]
        text-center text-md text-white focus:outline-none
        placeholder-gray-600 
        shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#dc2626,0_0_15px_#dc2626,0_0_30px_#dc2626]
        lg:p-2 lg:m-4 lg:text-lg`}
        placeholder={focused ? "" : placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export default Nickname;
