"use client";

import { useEffect, useRef, useState } from "react";

export const useFakeTyper = (strings: string[], speed = 175): string => {
  const [currentString, setCurrentString] = useState("");

  const charRef = useRef(0);
  const stringRef = useRef(0);
  const reverseRef = useRef(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateString = () => {
      if (reverseRef.current) {
        if (charRef.current > 0) {
          const updatedString = strings[stringRef.current].slice(0, charRef.current);
          setCurrentString(updatedString);
          charRef.current--;
        } else {
          reverseRef.current = false;
          stringRef.current = (stringRef.current + 1) % strings.length;
          setCurrentString("");
        }
      } else {
        if (charRef.current < strings[stringRef.current].length) {
          const char = strings[stringRef.current].charAt(charRef.current);
          const updatedString = currentString + char;
          setCurrentString(updatedString);
          charRef.current++;
        } else {
          reverseRef.current = true;
        }
      }
    };

    interval = setInterval(updateString, speed);

    return () => {
      clearInterval(interval);
    };
  }, [strings, speed]);

  return currentString;
};
