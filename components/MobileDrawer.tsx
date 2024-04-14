import { IconMenu2, IconCross } from "@tabler/icons-react";
import { FC, ReactNode, useState } from "react";

type MobileDrawerProps = {
  children: ReactNode;
};

const MobileDrawer: FC<MobileDrawerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={"transition hover:text-white md:hidden"}>
        <IconMenu2 size={20} />
      </button>

      <div
        className={`fixed bottom-0 left-0 right-0 top-0 bg-black transition md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className={"px-4 py-4"}>
          <button onClick={() => setIsOpen(false)} className={"transition hover:text-white md:hidden"}>
            <IconCross size={20} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default MobileDrawer;
