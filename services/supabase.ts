import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database } from "@/database.types";

export const createSupabaseClient = (anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) => {
  const cookieStore = cookies();

  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL, anonKey, {
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
      set: (name, value, options) => {
        cookieStore.set(name, value, options);
      },
      remove: (name, options) => {
        cookieStore.set(name, "", { ...options, maxAge: -1 });
      },
    },
  });
};
