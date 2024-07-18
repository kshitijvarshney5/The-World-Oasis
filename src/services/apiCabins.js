// import { ImGift } from "react-icons/im";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabin not found");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. create new cabin
  let query = supabase.from("cabins");
  //create
  if (!id)
    query = query.insert([
      {
        name: newCabin.name,
        maxCapacity: newCabin.maxCapacity,
        regularPrice: newCabin.regularPrice,
        discount: newCabin.discount,
        image: imagePath,
        description: newCabin.description,
      },
    ]);
  // edit
  if (id)
    query = query
      .update({
        name: newCabin.name,
        maxCapacity: newCabin.maxCapacity,
        regularPrice: newCabin.regularPrice,
        discount: newCabin.discount,
        image: imagePath,
        description: newCabin.description,
      })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created. Cabin not found");
  }

  //2 upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      contentType: newCabin.image.type,
    });

  //3. delete the cabin if there is error in uploading imag
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Cabin could not be uploaded. Cabin not created");
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted. Cabin not found");
  }
  return data;
}
