"use client";

import { FC, useState } from "react";

import Nickname from "@/components/Nickname";
import Writer from "@/components/Writer";

type PlayProps = {
  initialWords: string[];
};

const Play: FC<PlayProps> = ({ initialWords }) => {
  const [hasNicknameSet, setHasNicknameSet] = useState<boolean>(() => {
    try {
      return !!window.localStorage.getItem("nickname");
    } catch {
      return false;
    }
  });

  if (hasNicknameSet) {
    return <Writer initialWords={initialWords} />;
  }

  return (
    <Nickname
      onNicknameSet={(nickname: string) => {
        window.localStorage.setItem("nickname", nickname);
        setHasNicknameSet(true);
      }}
    />
  );
};

export default Play;
