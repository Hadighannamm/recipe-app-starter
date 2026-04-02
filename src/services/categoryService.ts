import { supabase } from "../lib/supabaseClient";

export async function getCategories(){
    return await supabase.from("categories").select("*").order("id")
}