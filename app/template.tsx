"use client";

import { IconBrandGithubFilled } from "@tabler/icons-react";
import Link from "next/link";
import { FC, ReactNode } from "react";

import Button from "@/components/Button";
import MobileDrawer from "@/components/MobileDrawer";

type TemplateProps = {
  children: ReactNode;
};

type NavItem = {
  label: string;
  href: string;
};

const navMenu: NavItem[] = [
  { label: "Play", href: "#play" },
  { label: "Leaderboard", href: "#leaderboard" },
];

const Template: FC<TemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-400">
      <div className={"container"}>
        <nav className="flex items-center justify-between py-8">
          <MobileDrawer>
            <div className={"flex flex-1 flex-col"}>
              {navMenu.map((item, index) => {
                const className = "p-4 transition hover:text-primary-500";

                if (item.href.startsWith("#")) {
                  return (
                    <a key={index} href={item.href} className={className}>
                      {item.label}
                    </a>
                  );
                }
                return (
                  <Link key={index} href={item.href} className={className}>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </MobileDrawer>

          <Link href={"/"} className={"text-xl font-semibold text-primary-500"}>
            SupaWriter
          </Link>

          <div className={"hidden flex-1 justify-center space-x-9 md:flex"}>
            {navMenu.map((item, index) => {
              const className = "font-semibold transition hover:text-primary-500";

              if (item.href.startsWith("#")) {
                return (
                  <a key={index} href={item.href} className={className}>
                    {item.label}
                  </a>
                );
              }
              return (
                <Link key={index} href={item.href} className={className}>
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className={"flex items-center space-x-4"}>
            <Button className={"flex items-center gap-2"} href={process.env.NEXT_PUBLIC_PROJECT_LINK}>
              Github
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
