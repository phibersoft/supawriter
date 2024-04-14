"use client";

import { IconBrandGithubFilled } from "@tabler/icons-react";
import Link from "next/link";
import { FC, ReactNode } from "react";

import { Button } from "@/components/shared";

import LogoSVG from "@/public/logo.svg";

type TemplateProps = {
  children: ReactNode;
};

const Template: FC<TemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#030303] text-gray-200">
      <div className={"container"}>
        <nav className="flex items-center justify-between py-8">
          <Link href={"/"} className={"text-xl font-semibold text-primary-500 flex items-center gap-2"}>
            <img src={LogoSVG.src} alt="SupaWriter" className={"h-6"} />
            SupaWriter
          </Link>
          <div className={"flex items-center space-x-4"}>
            <Button className={"flex items-center gap-2"} href={process.env.NEXT_PUBLIC_PROJECT_LINK}>
              <span className={"hidden sm:inline"}>Github</span>
              <IconBrandGithubFilled size={20} />
            </Button>
          </div>
        </nav>
        <main>{children}</main>
      </div>
      <footer className={`py-5 mt-10 border-t border-gray-700 border-opacity-50 bg-gray-800`}>
        <p className={"text-center text-gray-400 text-sm"}>
          Made with ❤️ by{" "}
          <a href="mailto:adem-uysal@outlook.com" className={"underline"}>
            Adem Uysal
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Template;
