import { DateHelpers } from './dateHelpers.js'

/**
 * Easter calculations.
 */
export class EasterCalculator {
  #helpers = new DateHelpers()
  #easterHolidayOffsets = [
    { name: 'Good Friday', daysFromEaster: -2 },
    { name: 'Easter', daysFromEaster: 0 },
    { name: 'Day after Easter', daysFromEaster: 1 },
    { name: 'Ascension Day', daysFromEaster: 39 },
    { name: 'Pentecost', daysFromEaster: 49 },
  ]

  /**
   * Calculates the date of all Easter-based holidays.
   *
   * @param {number} year - The year.
   * @returns {object[]} Holiday names and dates.
   */
  getEasterBasedHolidays(year) {
    // Get date of Easter
    const easter = this.#gaussAlgorithm(year)
    
    const easterBasedHolidays = []

    // For every easter-based holiday
    for (const holiday of this.#easterHolidayOffsets) {
      // Add name and date to a temporary object
      const tempEasterHoliday = {
        name: holiday.name,
        date: this.#helpers.addDays(easter, holiday.daysFromEaster)
      }
      // Add object to array
      easterBasedHolidays.push(tempEasterHoliday)
    }
    return easterBasedHolidays
  }

  /**
   * A simplified version of Gauss Easter Algorithm. Will get
   * the wrong date in a few specific cases, as well as the years
   * before 1900 and after 2199.
   *
   * @param {number} year - The year to calculate Easter in.
   * @returns {object} The date of Easter in the given year.
   */
  #gaussAlgorithm(year) {
    const a = year % 19
    const b = year % 4
    const c = year % 7

    const d = (19 * a + 24) % 30
    const e = (b * 2 + 4 * c + 6 * d + 5) % 7

    let easterMonth
    let easterDay

    if (d + e > 9) {
      easterDay = d + e - 9
      easterMonth = '04'
    } else {
      easterDay = 22 + d + e
      easterMonth = '03'
    }

    // If day is less than 10, add a 0 to date to avoid
    // time zone issues.
    if (easterDay < 10) {
      return new Date(`${year}-${easterMonth}-0${easterDay}`)
    }
    return new Date(`${year}-${easterMonth}-${easterDay}`)
  }
}
