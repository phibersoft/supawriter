import { FC, ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => any;
  size?: "sm" | "normal";
  theme?: "primary" | "secondary";
  className?: string;

  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  children,
  href,
  onClick,
  size = "normal",
  className: _className,
  theme = "secondary",
}) => {
  let className = `inline-block cursor-pointer transition ${_className}`;

  switch (theme) {
    case "primary":
      className += " text-white border-2 border-primary-500 bg-gray-500/10 hover:bg-primary-500 ";
      break;
    case "secondary":
      className += " text-gray-400 hover:text-white border-2 border-gray-500/30 hover:bg-gray-500/10 ";
      break;
  }

  switch (size) {
    case "sm":
      className += " px-2 py-1 text-sm rounded-lg";
      break;
    case "normal":
      className += " px-4 py-2 rounded-global";
      break;
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  } else {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
};
