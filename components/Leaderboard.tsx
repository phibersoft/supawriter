"use client";

import { FC, useEffect, useState } from "react";

import { Title } from "@/components/shared";

import { formatRelativeTime, supabaseBrowser } from "@/utils";

import { LeaderboardItem } from "@/types";

type LeaderboardProps = {
  initialData: Array<LeaderboardItem>;
};

const Leaderboard: FC<LeaderboardProps> = ({ initialData }) => {
  const [data, setData] = useState<LeaderboardItem[]>(initialData);

  useEffect(() => {
    const channel = supabaseBrowser
      .channel("realtime leaderboard")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "leaderboard",
        },
        (payload) => {
          // payload.new contains new record
          // data is already sorted by points
          // we can insert it in the correct position
          const newRecord = payload.new as LeaderboardItem;
          const newData = [...data];
          let i = 0;
          for (; i < newData.length; i++) {
            if (newRecord.points > newData[i].points) {
              break;
            }
          }

          // if we going to insert at the end, we can just push
          // otherwise we will pop the last element because we always want to keep the top 50
          if (i < newData.length && newData.length >= 50) {
            newData.pop();
          }

          newData.splice(i, 0, newRecord);
          setData(newData);
        },
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [data]);

  const evenRow = "bg-gray-700 bg-opacity-30";
  const oddRow = "bg-gray-800 bg-opacity-15";
  const headerCell =
    "px-2 py-2 text-center font-medium text-gray-300 uppercase tracking-wider text-xs md:text-sm md:px-3 md:py-3 lg:text-lg lg:px-6 lg:py-3";
  const rowCell =
    "px-2 py-2 whitespace-nowrap text-sm text-center text-gray-300 text-xs md:text-sm md:px-3 md:py-3 lg:text-lg lg:px-6 lg:py-4";

  return (
    <div id={"leaderboard"}>
      <Title>Leaderboard</Title>
      <table className={"w-full mb-2 border-corners"}>
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
            const rowClass = index % 2 === 0 ? evenRow : oddRow;

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

      <p
        // Dead text
        className={"text-center text-gray-400 text-sm"}
      >
        * Save your F5 key for emergencies; the leaderboard updates in real-time thanks to{" "}
        <a href="https://supabase.io" target="_blank" rel="noopener noreferrer" className={"underline"}>
          Supabase Realtime
        </a>
        !
      </p>
    </div>
  );
};

export default Leaderboard;
