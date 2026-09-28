import { DateHelpers } from './dateHelpers'

/**
 * Easter calculations.
 */
export class EasterCalculator {
  #helpers = new DateHelpers()
  /**
   * A simplified version of Gauss Easter Algorithm. Will get
   * the wrong date in a few specific cases, as well as the years
   * before 1900 and after 2199.
   *
   * @param {number} year - The year to calculate Easter in.
   * @returns {object} The date of Easter in the given year.
   */
  gaussAlgorithm(year) {
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
    return new Date(`${year}-${easterMonth}-${easterDay}`)
  }

  /**
   * Gets the date of the day after Easter (annandag påsk).
   *
   * @param {number} year - The year.
   * @returns {object} The date of the day after Easter.
   */
  getGoodFridayDate(year) {
    const easterDate = this.getEasterDate(year)
    return this.#helpers.addDays(easterDate, -2)
  }

  /**
   * Gets the date of Easter.
   *
   * @param {number} year - The year.
   * @returns {object} The date of Easter.
   */
  getEasterDate(year) {
    const date = this.gaussAlgorithm(year)
    return date
  }

  /**
   * Gets the date of the day after Easter (annandag påsk).
   *
   * @param {number} year - The year.
   * @returns {object} The date of the day after Easter.
   */
  getDayAfterEaster(year) {
    const easterDate = this.getEasterDate(year)
    return this.#helpers.addDays(easterDate, 1)
  }

  /**
   * Gets the date of Ascension Day that falls 39 days after Easter.
   *
   * @param {number} year - The year.
   * @returns {object} The date of Ascension Day.
   */
  getAscensionDayDate(year) {
    const easterDate = this.getEasterDate(year)
    return this.#helpers.addDays(easterDate, 39)
  }

  /**
   * Gets the date of Pentecost that falls 49 days after Easter.
   *
   * @param {number} year - The year.
   * @returns {object} The date of Pentecost.
   */
  getPentecostDate(year) {
    const easterDate = this.getEasterDate(year)
    return this.#helpers.addDays(easterDate, 49)
  }
}
