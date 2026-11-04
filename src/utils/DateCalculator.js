/**
 * Encapsulates helper methods that calculates or manipulates dates.
 */
export class DateCalculator {
  getWeekdayNumber(date) {
    return date.getUTCDay()
  }

  isWeekend(date) {
    return this.getWeekdayNumber(date) === 6 || this.getWeekdayNumber(date) === 0
  }

  // TODO: Only used in MovingHolidays.js. Move it there and break out into smaller methods in this class
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
      if (this.getWeekdayNumber(date) === weekdayToFind) {
        return date
      }
      date = this.addDaysTo(date, 1)
    }
    throw new Error(`Weekday ${weekdayToFind} not found in the given range.`)
  }

  /**
   * @param {object} date - The date to add days to.
   * @param {number} dayCount - The number of days to add.
   */
  addDaysTo(date, dayCount) {
    const newDate = new Date(date)
    newDate.setUTCDate(newDate.getUTCDate() + dayCount)
    return newDate
  }

  addDaysToDateString(dateString, days) {
    return this.convertToString(this.addDaysTo(this.convertToDate(dateString), days))
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
   * @param {string} dateString - The given date as a string.
   * @returns {object} the date object.
   */
  convertToDate(dateString) {
    return new Date(dateString)
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

  /**
   * Removes first place in the array.
   *
   * @param {string[]} dateStrings - Array of date strings.
   * @returns {string[]} Array of date strings.
   */
  excludeStartDate(dateStrings) {
    return dateStrings.slice(1)
  }

  /**
   * Removes last place in the array.
   *
   * @param {string[]} dateStrings - Array of date strings.
   * @returns {string[]} Array of date strings.
   */
  excludeEndDate(dateStrings) {
    return dateStrings.slice(0, -1)
  }
}
