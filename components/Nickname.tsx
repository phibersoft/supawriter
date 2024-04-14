"use client";

import { FC, useState } from "react";

import { globalKeyboard } from "@/components/Keyboard";
import { Input } from "@/components/shared";

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
      <Input
        id={"nickname"}
        type={"text"}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className={`shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#dc2626,0_0_15px_#dc2626,0_0_30px_#dc2626]`}
        placeholder={focused ? "" : placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        key={`nickname-input`}
      />
    </div>
  );
};

export default Nickname;
