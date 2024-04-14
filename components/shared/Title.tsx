import { FC, ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export const Title: FC<TitleProps> = ({ children }) => {
  return <h1 className="text-3xl font-bold text-center mb-7">{children}</h1>;
};
