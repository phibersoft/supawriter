import "./globals.scss";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { FC, ReactNode } from "react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SupaWriter - Improve Your Typing Speed and Accuracy",
  description:
    "Play SupaWriter, a fun ten-finger typing game that helps you type faster and more accurately. Compete with others on the leaderboard and track your progress!",
  keywords:
    "typing, ten fingers, speed, accuracy, leaderboard, typing test, typing game, typing practice, typing speed, typing accuracy, typing competition",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
