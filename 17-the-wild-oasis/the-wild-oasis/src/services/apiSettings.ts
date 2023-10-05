import { PostgrestError } from "@supabase/supabase-js";
import { TSetting, TSettings } from "../../types/remoteTypes";
import supabase from "./supabase";

type getSettingsResponse = {
  error: PostgrestError | null,
  data: TSettings | null
}

export async function getSettings() {
  const { data, error }: getSettingsResponse = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting : TSetting) {
  const { data, error } : getSettingsResponse = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
