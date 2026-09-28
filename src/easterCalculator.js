/**
 * Easter calculations.
 */
export class EasterCalculator {
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
}
