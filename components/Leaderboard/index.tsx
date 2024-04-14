"use client";

import { FC, useEffect, useState } from "react";

import { Title } from "@/components/shared";

import { supabaseBrowser } from "@/utils";

import { LeaderboardItem } from "@/types";

import { LeaderboardTable } from "./Table";

type LeaderboardProps = {
  initialData: Array<LeaderboardItem>;
};

const Leaderboard: FC<LeaderboardProps> = ({ initialData }) => {
  const [data, setData] = useState<LeaderboardItem[]>(initialData);
  const [newUser, setNewUser] = useState<LeaderboardItem | null>(initialData[0]);

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
          setNewUser(newRecord);
        },
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [data]);

  return (
    <div id={"leaderboard"}>
      <Title>Leaderboard</Title>
      <LeaderboardTable data={data} newUser={newUser} />
      <p className={"text-center text-gray-400 text-sm"}>
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
