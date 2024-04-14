export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SUPABASE_SERVICE_ROLE_KEY: string;
            NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
            NEXT_PUBLIC_SUPABASE_URL: string;
            NEXT_PUBLIC_PARAGRAPH_API_URL: string;
            NEXT_PUBLIC_PROJECT_LINK: string;
        }
    }
}