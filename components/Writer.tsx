"use client";

import { IconRestore } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { FC, useEffect, useMemo, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import colors from "tailwindcss/colors";

import { addScore } from "@/app/actions";

import { Input, Title } from "@/components/shared";

import paragraphApi from "@/services/paragraph-api";

import { WRITER_DURATION } from "@/CONSTANTS";

type WriterProps = {
  initialWords: string[];
};

const Writer: FC<WriterProps> = ({ initialWords }) => {
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const [words, setWords] = useState<string[]>(initialWords);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tryCount, setTryCount] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [canType, setCanType] = useState<boolean>(true);

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

    const words = await paragraphApi.getRandomWords();
    setWords(words);

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
    <motion.div
      className="flex flex-col items-center p-5 relative overflow-hidden"
      // Come to screen from right
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      transition={{ duration: 0.2 }}
    >
      <Title>Play</Title>
      <div className={`text-base flex items-center justify-center ${isLoading ? "blur-sm" : ""}`}>
        {words.map((word, index) => {
          let className = "inline-block p-1 rounded-sm mr-0.5 text-white duration-100";

          if (index > typedWords.length + 5 || index < typedWords.length - 1) {
            className += " hidden";
          } else {
            if (index === typedWords.length) {
              className += " bg-blue-500";
            } else {
              if (typedWords[index] !== undefined) {
                if (typedWords[index] === word) {
                  className += " bg-green-500";
                } else {
                  className += " bg-red-500";
                }

                // Add small blur to word
                className += " blur-[1.5px]";
              } else {
                className += " bg-gray-900";
              }
            }
          }

          return (
            <span key={index} className={className}>
              {word}
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
          duration={WRITER_DURATION}
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
    </motion.div>
  );
};

export default Writer;
