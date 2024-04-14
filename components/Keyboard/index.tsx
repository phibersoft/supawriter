"use client";

import { FC, useEffect } from "react";

import { KeyboardKey } from "./Key";
import { KeyboardRow } from "./Row";
import { globalKeyboard, HighlightEvent } from "./global-keyboard";

const Keyboard: FC = () => {
  useEffect(() => {
    const handleHighlight = (e: Event) => {
      const keyNodes = document.querySelectorAll(`[data-keyboard-key="${(e as HighlightEvent).key}"]`);

      if (keyNodes) {
        keyNodes.forEach((keyNode) => {
          keyNode.classList.add(globalKeyboard.animatedClass);
          setTimeout(() => {
            keyNode.classList.remove(globalKeyboard.animatedClass);
          }, globalKeyboard.animationDuration);
        });
      }
    };

    globalKeyboard.addEventListener("highlight", handleHighlight);

    return () => {
      globalKeyboard.removeEventListener("highlight", handleHighlight);
    };
  }, []);

  useEffect(() => {
    globalKeyboard.startAnimation();

    return () => {
      globalKeyboard.stopAnimation();
    };
  }, []);

  return (
    <div className={"flex flex-col w-full"}>
      {globalKeyboard.keys.map((row, rowIndex) => (
        <KeyboardRow key={rowIndex}>
          {row.map((key) => (
            <KeyboardKey key={`keyboard-${key}`} value={key} grow={key === "space"} />
          ))}
        </KeyboardRow>
      ))}
    </div>
  );
};

export default Keyboard;
export * from "./global-keyboard";
export * from "./Key";
export * from "./Row";
