"use client";

import { FC, useEffect, useState } from "react";

import Nickname from "@/components/Nickname";
import Writer from "@/components/Writer";

type PlayProps = {
  initialWords: string[];
};

const Play: FC<PlayProps> = ({ initialWords }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasNicknameSet, setHasNicknameSet] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    if (window.localStorage.getItem("nickname")) {
      setHasNicknameSet(true);
    }
  }, []);

  if (loading) {
    return null;
  }

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
