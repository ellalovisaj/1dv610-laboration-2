/**
 * Module...
 */
export class DateHelpers {
  /**
   * Returns a number representing the weekday of the given date.
   * (Monday = 1, Tuesday = 2 etc.)
   *
   * @param {object} date - The date to find weekday from.
   * @returns {number} The day of the week in numbers.
   */
  getWeekday(date) {
    const weekday = date.getDay()
    return weekday
  }

  // TODO: Doesn't work over different months and years
  /**
   * Adds a given amount of days to a date.
   *
   * @param {object} date - The date to add days to.
   * @param {number} days - The number of days to add.
   * @returns {object} The date with days added.
   */
  addDays(date, days) {
    const dateString = date.toISOString().split('T')[0]
    const dateArray = dateString.split('-')
    const newDay = parseInt(dateArray[2]) + days

    return new Date(`${dateArray[0]}-${dateArray[1]}-${newDay}`)
  }
}
