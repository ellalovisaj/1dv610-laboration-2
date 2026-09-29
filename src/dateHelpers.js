/**
 * Module...
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
   * @param {object} date1 - The first date in the range.
   * @param {object} date2 - The last date in the range.
   * @param {number} weekdayToFind - Number of the weekday to find.
   * @returns {object} The first day of the given weekday.
   */
  findFirstDateOfWeekdayBetween(date1, date2, weekdayToFind) {
    let date = new Date(date1)

    while (date.getTime() <= date2.getTime()) {
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
}
