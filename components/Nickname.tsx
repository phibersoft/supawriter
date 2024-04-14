"use client";

import { motion } from "framer-motion";
import { FC, useState } from "react";

import { Input } from "@/components/shared";

import { useFakeTyper } from "@/hooks";

type NicknameProps = {
  onNicknameSet: (nickname: string) => void;
};

const Nickname: FC<NicknameProps> = ({ onNicknameSet }) => {
  const placeholder = useFakeTyper(["Barry Allen", "Usain Bolt", "Sonic", "Quicksilver", "The Flash"]);
  const [nickname, setNickname] = useState<string>("");
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className={"flex flex-col items-center p-5"}
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      transition={{ duration: 0.2 }}
    >
      <label htmlFor={"nickname"} className={"text-md font-bold md:text-lg lg:text-2xl"}>
        How do slow people address you?
      </label>
      <Input
        id={"nickname"}
        type={"text"}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onNicknameSet(nickname);
          }
        }}
        className={`shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#dc2626,0_0_15px_#dc2626,0_0_30px_#dc2626]`}
        placeholder={focused ? "" : placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        key={`nickname-input`}
      />
    </motion.div>
  );
};

export default Nickname;
