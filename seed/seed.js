import knex from "../src/lib/knex.js";

const run = async () => {
    
    if (!(await knex.schema.hasTable('plants'))) {
        await knex.schema.createTable("plants", function (table) {
          table.increments("id");
          table.string("name");
          table.integer("when_to_plant");
          table.integer("days_indoors");
          table.integer("days_till_harvest");
          table.string("harvest_type");
          table.string("modified");
        });
        
        await knex('plants').insert({name: 'tomato', modified: new Date(Date.now()).toISOString(), days_indoors: 56, days_till_harvest: 100, when_to_plant: 4, harvest_type: "determinate" })
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
