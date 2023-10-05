import { PostgrestError } from "@supabase/supabase-js";
import { TCabin } from "../../types/remoteTypes";
import supabase, { supabaseUrl } from "./supabase";
import { ca } from "date-fns/locale";

type getCabinsResponse = {
  data: TCabin[] | null;
  error: PostgrestError | null;
};

export async function getCabins() {
  const { data: cabins, error }: getCabinsResponse = await supabase
    .from("cabins")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return cabins;
}

export async function deleteCabin(id?: number) {
  if (!id) throw new Error("id is required");
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function createUpdateCabin(cabin: TCabin) {
  const isEditing = Boolean(cabin.id);
  console.log("isEditing: ", isEditing);
  console.log("cabin: ", cabin);

  const imgName = `${(Math.random() * 1000).toPrecision(3)}-${
    cabin.image?.name
  }`.replace("/", "");
  const imgPath =
    typeof cabin.image === "string"
      ? cabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabins-imgs/${imgName}`;

  let query = supabase.from("cabins");
  if (isEditing) {
    query = query
      .update({
        ...cabin,
        image: typeof cabin.image === "string" ? cabin.image : imgPath,
      })
      .eq("id", cabin.id)
      .select();
  } else {
    query = query.insert([{ ...cabin, image: imgPath }]).select();
  }

  const { data: cabinData, error: cabinError }: getCabinsResponse = await query;

  console.log(`cabinError: `, cabinError);
  console.log("cabinData: ", cabinData);

  if (cabinError) {
    console.error(cabinError);
    throw new Error(cabinError.message);
  }

  console.log("cabin created");

  if (typeof cabin.image === "string") return cabinData?.at(0);

  const { error: ImgError } = await supabase.storage
    .from("cabins-imgs")
    .upload(imgName, cabin.image);

  console.log("ImgError: ", ImgError);

  if (ImgError) {
    try {
      await deleteCabin(cabinData?.at(0).id);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
    throw new Error(ImgError.message);
  }

  return cabinData?.at(0);
}
