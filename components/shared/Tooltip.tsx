import { FC, ReactNode, useState } from "react";

type TooltipProps = {
  trigger: ReactNode;
  triggerClassName?: string;
  content: ReactNode;
  contentClassName?: string;
};

export const Tooltip: FC<TooltipProps> = ({ triggerClassName = "", trigger, contentClassName = "", content }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={`inline-block relative underline decoration-primary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${triggerClassName}`}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {trigger}

        {show && (
          <div
            className={`absolute 
            top-[-10px]
            left-1/2 transform -translate-x-1/2 -translate-y-full
            z-20 p-2 mt-2 text-center text-gray-900 bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100
            ${contentClassName}`}
          >
            {content}
          </div>
        )}
      </div>
    </>
  );
};
