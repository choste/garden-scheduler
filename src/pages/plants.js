import knex from "./../lib/knex.js";

export async function POST(Astro) {
  const data = await Astro.request.formData();

  console.log(data)

  await knex('plants').insert({name: data.get('name'), modified: new Date(Date.now()).toISOString(), days_indoors: data.get('startInside'), days_till_harvest: data.get('daysTillHarvest'), when_to_plant: data.get('whenToPlant'), harvest_type: data.get('harvestType')})
        
  return new Response(null, {
    status: 200,
  });
}
