import { describe, it, expect } from 'vitest'
import { getSeedStartDate, getHarvestDate } from './scheduleHandler'

describe('suite', () => {
  it('Calculates the day and month to plant', () => {
    const plant_data = {
        name: 'tomato',
        days_indoors: 8,
        days_till_harvest: 70,
        when_to_plant: 4,
        harvest_type: 'determinate'
    }
    const plantAt = '2024-05-05'

    const result = getSeedStartDate(plant_data, plantAt)

    expect(formatDate(result)).toBe('2024-04-26')
  })

  it('Calculates the harvest date', () => {
    const plant_data = {
        name: 'tomato',
        days_indoors: 8,
        days_till_harvest: 70,
        when_to_plant: 4,
        harvest_type: 'determinate'
    }
    const plantAt = '2024-05-05'

    const result = getHarvestDate(plant_data, plantAt)

    expect(formatDate(result)).toBe('2024-07-13')
  })

})

function formatDate(d) {
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}