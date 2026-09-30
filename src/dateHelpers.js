/**
 * Represents helper functions that works with dates.
 */
export class DateHelpers {
  /**
   * Returns a number representing the weekday of the given date.
   * (Sunday = 0, Monday = 1, Tuesday = 2 etc.)
   *
   * @param {object} date - The date to find weekday from.
   * @returns {number} The day of the week in numbers.
   */
  getWeekday(date) {
    const weekday = date.getDay()
    return weekday
  }

  /**
   * Checks if a given date is a weekend.
   *
   * @param {object} date - The given date.
   * @returns {boolean} True if it is a weekend, false if not.
   */
  isWeekend(date) {
    if (this.getWeekday(date) === 6 || this.getWeekday(date) === 0) {
      return true
    }
    return false
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
    newDate.setDate(newDate.getDate() + days)
    return newDate
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
    return this.convertToString(today)
  }

  /**
   * Checks if date falls in current calendar's year.
   *
   * @param {string} dateStr - The given date as a string.
   * @param {number} year - The current calendar year.
   */
  validateYear(dateStr, year) {
    const date = this.convertToDate(dateStr)

    if (date.getFullYear() !== year) {
      throw new Error("Date is outside this calendar year.")
    }
  }
}
