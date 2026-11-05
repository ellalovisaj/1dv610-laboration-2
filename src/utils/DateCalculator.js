/**
 * Encapsulates helper methods that calculates or manipulates dates.
 */
export class DateCalculator {
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

  removeFirstPlaceOf(dateStrings) {
    return dateStrings.slice(1)
  }

  removeLastPlaceOf(dateStrings) {
    return dateStrings.slice(0, -1)
  }

  getWeekdayNumber(date) {
    return date.getUTCDay()
  }

  isWeekend(date) {
    return this.getWeekdayNumber(date) === 6 || this.getWeekdayNumber(date) === 0
  }

  firstDateOfWeekdayFrom(date, weekday) {
    let currentDate = date

    while (!this.#isSameWeekday(currentDate, weekday)) {
      currentDate = this.addDaysTo(currentDate, 1)
    }
    return currentDate
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
    // Use sv-SE to get YYYY-MM-DD format on local time.
    // By converting with .toISOString(), the time zone will always be UTC
    return this.#getTodaysDate().toLocaleDateString('sv-SE')
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

  getCurrentYear() {
    return this.getYearOf(this.getTodaysDateString())
  }
}
