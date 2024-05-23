import knex from "./knex.js";

export default async function handler(Astro) {
  let result = [];

  if (Astro.request.method === "POST") {
    console.log("we be posting");
    try {
      const data = await Astro.request.formData();

      const plant_data = await knex
        .where("name", data.get("name"))
        .select()
        .table("plants");

      const plantAt = data.get('plantAt')

      if (plant_data.length) {
        if (data.get("fromSeed")) {
          const startDate = getSeedStartDate(plant_data[0],plantAt)
          console.log('start indoors at ',startDate)
          await knex("events").insert({
            message: "Start tomatoes indoors",
            day: startDate.getDate() + 1,
            month: startDate.getMonth(),
          });
        }

        const plantDate = new Date(plantAt)

        await knex("events").insert({
          message: "Transplant tomatoes outdoors",
          day: plantDate.getDate() + 1,
          month: plantDate.getMonth(),
        });

        const harvestDate = getHarvestDate(plant_data[0],plantAt)
        await knex("events").insert({
          message: "Start harvesting tomatoes",
          day: harvestDate.getDate() + 1,
          month: harvestDate.getMonth(),
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

export function getSeedStartDate(plant_data, plantAt) {
  const plantDate = new Date(plantAt)
  plantDate.setDate(plantDate.getDate() - plant_data.days_indoors)

  return plantDate
}

export function getHarvestDate(plant_data, plantAt) {
  const plantDate = new Date(plantAt)
  plantDate.setDate(plantDate.getDate() + plant_data.days_till_harvest)

  return plantDate
}

