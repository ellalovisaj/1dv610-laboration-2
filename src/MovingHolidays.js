/**
 * Represents the Swedish holidays in a given year.
 */

import { DateHelpers } from './dateHelpers.js'
import { EasterCalculator } from './easterCalculator.js'

/**
 *
 */
export class MovingHolidays {
  #year
  #helpers = new DateHelpers()
  #easterHelpers = new EasterCalculator()
  #movingHolidays = []

  /**
   * Constructor of the MovingHolidays class.
   * 
   * @param {number} year - The year.
   */
  constructor(year) {
    this.#year = year
  }

  /**
   * Gets the date of Midsummer Day. It occurs the day after
   * Midsummer Eve, which falls on the first Friday between the 19th
   * and the 25th of June.
   *
   * @returns {object} The name and date of Midsummer Day.
   */
  #getMidsummerDayDate() {
    const startDate = new Date(`${this.#year}-06-19`)
    const endDate = new Date(`${this.#year}-06-25`)
    const midsummerEve = this.#helpers.findFirstDateOfWeekdayBetween(startDate, endDate, 5)

    const midsummerDay = {
      name: 'Midsummer',
      date: this.#helpers.addDays(midsummerEve, 1),
    }

    return midsummerDay
  }

  /**
   * Gets the date of All Saint's Day, which falls on the Saturday
   * between 31st of October and 6th of November.
   *
   * @returns {object} The name and date of All Saint's Day.
   */
  #getAllSaintsDayDate() {
    const startDate = new Date(`${this.#year}-10-31`)
    const endDate = new Date(`${this.#year}-11-07`)

    const allSaintsDay = {
      name: "All Saint's Day",
      date: this.#helpers.findFirstDateOfWeekdayBetween(startDate, endDate, 6),
    }

    return allSaintsDay
  }
}
