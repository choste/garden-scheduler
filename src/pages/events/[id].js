import knex from "../../lib/knex.js";

export async function DELETE({ params }) {
  const id = params.id;

  await knex("events").where("id", id).del();

  return new Response(null, {
    status: 200,
  });
}
