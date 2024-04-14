"use client";

import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        if (item.startsWith("{") || item.startsWith("[")) {
          return JSON.parse(item);
        }

        return item;
      }

      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      // window.localStorage.setItem(key, JSON.stringify(value));
      let valueToStore = value;
      if (typeof value === "object") {
        valueToStore = JSON.stringify(value);
      }

      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};
