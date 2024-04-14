import { FC } from "react";

import { formatRelativeTime } from "@/utils";

import { LeaderboardItem } from "@/types";

import { NewUserPopup } from "./NewUserPopup";

type LeaderboardTableProps = {
  data: Array<LeaderboardItem>;

  newUser?: LeaderboardItem | null;
};

export const LeaderboardTable: FC<LeaderboardTableProps> = ({ data, newUser }) => {
  const evenRow = "bg-gray-700 bg-opacity-30";
  const oddRow = "bg-gray-800 bg-opacity-15";
  const headerCell =
    "px-2 py-2 text-center font-medium text-gray-300 uppercase tracking-wider text-xs md:text-sm md:px-3 md:py-3 lg:text-lg lg:px-6 lg:py-3";
  const rowCell =
    "px-2 py-2 whitespace-nowrap text-sm text-center text-gray-300 text-xs md:text-sm md:px-3 md:py-3 lg:text-lg lg:px-6 lg:py-4";

  return (
    <div className={"border-corners relative"}>
      <div />
      <div className={"mb-2 max-h-[600px] overflow-y-auto"}>
        <table className={"w-full"}>
          <thead>
            <tr>
              <th className={`${headerCell} font-bold`}>Rank</th>
              <th className={headerCell}>Nickname</th>
              <th className={headerCell}>Points</th>
              <th className={headerCell}>Writed At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              let rowClass = index % 2 === 0 ? evenRow : oddRow;

              if (newUser && item.id === newUser.id) {
                rowClass += " blink";
              }

              return (
                <tr key={item.id} className={rowClass}>
                  <td className={`${rowCell} font-bold`}>#{index < 50 ? index + 1 : "50+"}</td>
                  <td className={rowCell}>{item.nickname}</td>
                  <td className={rowCell}>{item.points}</td>
                  <td className={rowCell}>{formatRelativeTime(new Date(item.created_at))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {newUser && <NewUserPopup item={newUser} key={`new-user-${newUser.id}`} />}
    </div>
  );
};
