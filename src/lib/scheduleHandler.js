import knex from "./knex.js";

export default async function handler(Astro) {
  let result = [];
  
  if (Astro.request.method === "POST") {
    console.log("we be posting")
    try {
      const data = await Astro.request.formData();
      if (data.get("plant") == 'tomato' ) {
        await knex("events").insert({
          message: "Start tomatoes indoors",
          day: 3,
          month: 2,
        });
        await knex("events").insert({
          message: "Transplant tomatoes outdoors",
          day: 5,
          month: 4,
        });
        await knex("events").insert({
          message: "Start harvesting tomatoes",
          day: 7,
          month: 6,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  return await knex.select().table("events");
}
