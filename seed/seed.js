import knex from "../src/lib/knex.js";

const run = async () => {
    
    if (!(await knex.schema.hasTable('plants'))) {
        await knex.schema.createTable("plants", function (table) {
          table.increments("id");
          table.string("name");
          table.integer("start");
          table.string("plant");
          table.integer("harvest");
          table.string("modified");
        });
        
        await knex('plants').insert({name: 'tomatoes', modified: new Date(Date.now()).toISOString(), start: 8, harvest: 70, plant: (new Date('May 01, 2024 00:00:00 GMT-7:00')).toISOString()})
    }

    if (!(await knex.schema.hasTable('events'))) {
      await knex.schema.createTable('events', function (table) {
        table.increments("id");
        table.string("message");
        table.integer("day");
        table.integer("month");
      })

    }



    knex.destroy();
}

run();
