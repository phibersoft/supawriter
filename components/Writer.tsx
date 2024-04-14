"use client";

import { IconRestore } from "@tabler/icons-react";
import { FC, useEffect, useMemo, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import colors from "tailwindcss/colors";

import { addScore } from "@/app/actions";

import { Input, Title } from "@/components/shared";

import paragraphApi from "@/services/paragraph-api";

type WriterProps = {
  initialParagraph: string;
};

const DURATION = 60;

const Writer: FC<WriterProps> = ({ initialParagraph }) => {
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const [paragraph, setParagraph] = useState<string>(initialParagraph);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tryCount, setTryCount] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [canType, setCanType] = useState<boolean>(true);

  const words = useMemo(() => paragraph.split(" "), [paragraph]);
  const correctLetterCount = useMemo(() => correctWords.reduce((acc, word) => acc + word.length, 0), [correctWords]);

  // Update correctWords when typedWords changes
  useEffect(() => {
    setCorrectWords(
      typedWords.filter((word, index) => {
        return words[index] === word;
      }),
    );
  }, [typedWords, words]);

  const reset = async () => {
    setTypedWords([]);
    setCurrentWord("");
    setCorrectWords([]);
    setTryCount((prev) => prev + 1);
    setIsTimerRunning(false);
    setCanType(true);
    setIsLoading(true);

    let paragraph = await paragraphApi.getRandomParagraph();
    setParagraph(paragraph);

    setIsLoading(false);
  };

  const finish = async () => {
    setCanType(false);
    setIsTimerRunning(false);
    setTryCount((prev) => prev + 1);

    // Update the leaderboard
    await addScore(window.localStorage.getItem("nickname") || "Anonymous", correctLetterCount);
    await new Promise((resolve) => setTimeout(resolve, 3500));
    await reset();
  };

  return (
    <div className="flex flex-col items-center p-5 relative overflow-hidden" id={"play"}>
      <Title>Play</Title>
      <div className={`text-base ${isLoading ? "blur-sm" : ""}`}>
        {words.map((word, index) => {
          return (
            <span
              key={index}
              className={`${
                typedWords[index] === word
                  ? "bg-green-500 text-white"
                  : typedWords[index] === undefined
                    ? ""
                    : "bg-red-500 text-white"
              } ${index === typedWords.length ? "bg-blue-500 text-white" : ""} mr-1`}
            >
              {word}{" "}
            </span>
          );
        })}
      </div>
      <div className={`flex items-center justify-center w-full mt-5`}>
        <Input
          type="text"
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value)}
          onKeyDown={(e) => {
            // Start the timer
            if (!isTimerRunning) {
              setIsTimerRunning(true);
            }

            switch (e.key) {
              case " ":
              case "Enter":
                setTypedWords([...typedWords, currentWord.trim()]);
                setCurrentWord("");
                break;
            }
          }}
          placeholder={"Type to start..."}
          disabled={!canType || isLoading}
          key={`writer-input`}
        />
        <button
          className={"mr-2"}
          onClick={async () => {
            await reset();
          }}
          disabled={isLoading}
        >
          <IconRestore size={24} />
        </button>
        <CountdownCircleTimer
          duration={DURATION}
          colors={colors.red["600"]}
          isPlaying={isTimerRunning}
          onComplete={() => {
            finish();
          }}
          size={24}
          strokeWidth={3}
          key={`countdown-${tryCount}`}
        />

        {/*  Results - only popup when user is not be able to type  */}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-bold backdrop-blur-sm transform transition-transform duration-300 ${
            canType ? "translate-y-full" : ""
          }`}
        >
          {correctLetterCount} letters ({correctWords.length} words) typed correctly, awesome!
        </div>
      </div>
    </div>
  );
};

export default Writer;
