import { FC, ReactNode } from "react";

type KeyboardRowProps = {
  children: ReactNode;
};

export const KeyboardRow: FC<KeyboardRowProps> = ({ children }) => {
  return <div className={"flex flex-row w-full justify-between gap-[0.1px]"}>{children}</div>;
};
