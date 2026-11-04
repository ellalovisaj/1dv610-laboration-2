/**
 * Encapsulates helper methods that calculates or manipulates dates.
 */
export class DateCalculator {
  /**
   * Returns a number representing the weekday of the given date.
   * (Sunday = 0, Monday = 1, Tuesday = 2 etc.)
   *
   * @param {object} date - The date to find weekday from.
   * @returns {number} The day of the week in numbers.
   */
  getWeekday(date) {
    return date.getUTCDay()
  }

  /**
   * Checks if a given date is a weekend.
   *
   * @param {object} date - The given date.
   * @returns {boolean} True if it is a weekend, false if not.
   */
  isWeekend(date) {
    return (this.getWeekday(date) === 6 || this.getWeekday(date) === 0)
  }

  /**
   * Finds the first date of the given weekday between the two
   * given dates.
   *
   * @param {object} startDate - The first date in the range.
   * @param {object} endDate - The last date in the range.
   * @param {number} weekdayToFind - Number of the weekday to find.
   * @returns {object} The first day of the given weekday.
   */
  findFirstDateOfWeekdayBetween(startDate, endDate, weekdayToFind) {
    let date = new Date(startDate)

    while (date.getTime() <= endDate.getTime()) {
      if (this.getWeekday(date) === weekdayToFind) {
        return date
      }
      date = this.addDays(date, 1)
    }
    throw new Error(`Weekday ${weekdayToFind} not found in the given range.`)
  }

  /**
   * Adds a given amount of days to a date.
   *
   * @param {object} date - The date to add days to.
   * @param {number} days - The number of days to add.
   * @returns {object} The date with days added.
   */
  addDays(date, days) {
    const newDate = new Date(date)
    newDate.setUTCDate(newDate.getUTCDate() + days)
    return newDate
  }

  addDaysToString(dateStr, days) {
    return this.convertToString(this.addDays(this.convertToDate(dateStr), days))
  }

  /**
   * Converts date object to string in YYYY-MM-DD format.
   *
   * @param {object} date - The given date.
   * @returns {string} the date as a string.
   */
  convertToString(date) {
    return date.toISOString().split('T')[0]
  }

  /**
   * Converts a string into a date object.
   *
   * @param {string} dateStr - The given date as a string.
   * @returns {object} the date object.
   */
  convertToDate(dateStr) {
    return new Date(dateStr)
  }

  /**
   * Get today's date and return it as a date string.
   *
   * @returns {string} Today's date as a string.
   */
  getTodaysDate() {
    const today = new Date()

    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()

    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  firstDayOfYear(year) {
    return `${year}-01-01`
  }

  lastDayOfYear(year) {
    return `${year}-12-31`
  }

  getYearOf(date) {
    return new Date(date).getUTCFullYear()
  }

  isDifferentYears(firstDate, secondDate) {
    return this.getYearOf(firstDate) !== this.getYearOf(secondDate)
  }

  isSameDate(firstDate, secondDate) {
    return firstDate === secondDate
  }

  getCurrentYear() {
    return this.getYearOf(this.getTodaysDate())
  }

  excludeStartDate(dateStrings) {
    return dateStrings.slice(1)
  }

  excludeEndDate(dateStrings) {
    return dateStrings.slice(0, -1)
  }
}
