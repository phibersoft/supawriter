import { FC } from "react";

import { LeaderboardItem } from "@/types";

type NewUserPopupProps = {
  item: LeaderboardItem;
};

export const NewUserPopup: FC<NewUserPopupProps> = ({ item }) => {
  return (
    <div className={"absolute top-[-61px] right-0 w-[200px] bg-gray-800 rounded-md p-2 fly"}>
      <h1 className={"text-md font-bold text-gray-300"}>New User!</h1>
      <p className={"text-sm text-gray-300"}>
        {item.nickname} ({item.points} points)
      </p>
    </div>
  );
};
