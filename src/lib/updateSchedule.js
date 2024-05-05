import knex from "./knex.js"

export default async function handler(Astro) {
    let result = []
    if (Astro.request.method === "POST") {
    try {
      const data = await Astro.request.formData()
      if (data.get('tomatoes')) {
        result = await knex.select().table('plants')
      }
      
    } catch (error) {
      if (error instanceof Error) {
          console.error(error.message)
      }
    }
  }
  return result
}