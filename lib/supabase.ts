import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type FramesSchema = {
  id: number;
  created_at: string;
  owner_key: string;
  title: string;
  description: string;
};

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
