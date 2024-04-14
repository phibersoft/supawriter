import { NextPage } from "next";
import dynamic from "next/dynamic";

import Hero from "@/components/Hero";
import Leaderboard from "@/components/Leaderboard";

import paragraphApi from "@/services/paragraph-api";
import { createSupabaseClient } from "@/services/supabase";

const Play = dynamic(() => import("@/components/Play"), { ssr: false });

const Home: NextPage = async () => {
  const words = await paragraphApi.getRandomWords();

  const supabaseServer = createSupabaseClient();
  const { data: leaderboard } = await supabaseServer
    .from("leaderboard")
    .select("*")
    .order("points", { ascending: false })
    .limit(50);

  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <Play initialWords={words} />
      </section>
      <section>
        <Leaderboard initialData={leaderboard ?? []} />
      </section>
    </>
  );
};

export default Home;
