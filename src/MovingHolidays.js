import { DateCalculator } from './utils/DateCalculator.js'
import { EasterCalculator } from './EasterCalculator.js'

/**
 * Represents the moving Swedish holidays in a given year.
 */
export class MovingHolidays {
  #year
  #calculator = new DateCalculator()
  #easterHelpers = new EasterCalculator()

  /**
   * Constructor of the MovingHolidays class.
   *
   * @param {number} year - The year.
   */
  constructor(year) {
    this.#year = year
  }

  /**
   * Returns an array of all holidays that doesn't have a fixed date.
   *
   * @returns {object[]} An array of holidays, containing name and date.
   */
  getMovingHolidays() {
    return [...this.#getEasterHolidays(), ...this.#getWeekdayBasedHolidays()]
  }

  /**
   * Returns the Easter-based holidays.
   */
  #getEasterHolidays() {
    return this.#easterHelpers.getEasterBasedHolidays(this.#year)
  }

  /**
   * Returns the weekday-based holidays.
   */
  #getWeekdayBasedHolidays() {
    return [this.#getMidsummerDayDate(), this.#getAllSaintsDayDate()]
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
    const midsummerEve = this.#calculator.findFirstDateOfWeekdayBetween(startDate, endDate, 5)

    const midsummerDay = {
      name: 'Midsummer',
      date: this.#calculator.addDays(midsummerEve, 1),
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
    const endDate = new Date(`${this.#year}-11-06`)

    const allSaintsDay = {
      name: "All Saint's Day",
      date: this.#calculator.findFirstDateOfWeekdayBetween(startDate, endDate, 6),
    }

    return allSaintsDay
  }
}
