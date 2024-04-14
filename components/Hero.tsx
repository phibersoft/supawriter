"use client";

import Image from "next/image";
import { FC } from "react";

import Keyboard from "@/components/Keyboard";
import { Tooltip } from "@/components/shared";

import RespectIsImportant from "@/public/respect_is_important.webp";

const Hero: FC = () => {
  return (
    <div className={"flex flex-col justify-between py-10 xl:flex-row lg:py-28 gap-10"}>
      <h1 className={"text-md text-center font-bold md:text-2xl xl:text-left lg:text-3xl xl:max-w-[500px] cursor-default"}>
        Showcase your keyboard skills, climb the leaderboard, and become the{" "}
        <span className={"bg-gradient-to-r from-[#ff00a9] to-[#ff6c00] text-transparent bg-clip-text"}>Fastest Writer Alive</span>
        . You won&apos;t earn money, but you will earn respect--which,{" "}
        <Tooltip
          trigger={"to some, is more important!"}
          content={<Image src={RespectIsImportant} alt={"Respect is important"} className={"w-60"} />}
        />
      </h1>
      <Keyboard />
    </div>
  );
};

export default Hero;
