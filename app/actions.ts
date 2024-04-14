"use server";

import { createSupabaseClient } from "@/services/supabase";

export const addScore = async (nickname: string, points: number) => {
  const supabaseServer = createSupabaseClient(process.env.SUPABASE_SERVICE_ROLE_KEY);

  console.log(`Adding score for ${nickname} with ${points} points`);

  await supabaseServer.from("leaderboard").insert([
    {
      nickname,
      points,
    },
  ]);
};
