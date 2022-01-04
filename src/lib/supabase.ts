import {createClient, SupabaseClient} from "@supabase/supabase-js";

const supabase:SupabaseClient = createClient(
    import.meta.env.VITE_SUPABASE_API_URL,
    import.meta.env.VITE_SUPABASE_API_KEY
);


export default supabase