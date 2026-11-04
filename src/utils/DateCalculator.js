/**
 * Encapsulates helper methods that calculates or manipulates dates.
 */
export class DateCalculator {
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

  /**
   * @param {object} date - The date to add days to.
   * @param {number} dayCount - The number of days to add.
   */
  addDaysTo(date, dayCount) {
    const newDate = new Date(date)
    newDate.setUTCDate(newDate.getUTCDate() + dayCount)
    return newDate
  }

  /**
   * @param {string} dateString - The date string to add days to.
   * @param {number} dayCount - The number of days to add.
   */
  addDaysToDateString(dateString, dayCount) {
    return this.convertToString(this.addDaysTo(this.convertToDate(dateString), dayCount))
  }

  getWeekdayNumber(date) {
    return date.getUTCDay()
  }

  isWeekend(date) {
    return this.getWeekdayNumber(date) === 6 || this.getWeekdayNumber(date) === 0
  }

  firstDateOfWeekdayFrom(date, weekday) {
    while (!this.#isSameWeekday(date, weekday)) {
      date = this.addDaysTo(date, 1)
    }
    return date
  }

  #isSameWeekday(date, weekday) {
    return this.getWeekdayNumber(date) === weekday
  }

  convertToString(date) {
    return date.toISOString().split('T')[0]
  }

  convertToDate(dateString) {
    return new Date(dateString)
  }

  getTodaysDateString() {
    return this.convertToString(this.#getTodaysDate())
  }

  #getTodaysDate() {
    return new Date()
  }

  firstDayOfYear(year) {
    return `${year}-01-01`
  }

  lastDayOfYear(year) {
    return `${year}-12-31`
  }

  getYearOf(dateString) {
    return new Date(dateString).getUTCFullYear()
  }

  isDifferentYears(firstDate, secondDate) {
    return this.getYearOf(firstDate) !== this.getYearOf(secondDate)
  }

  isSameDate(firstDate, secondDate) {
    return firstDate === secondDate
  }

  getCurrentYear() {
    return this.getYearOf(this.getTodaysDateString())
  }
}
