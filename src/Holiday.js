/**
 * Module...
 */
export class Holiday {
  #year

  /**
   * Constructor.
   *
   * @param year
   */
  constructor(year) {
    this.#year = year
  }

  /**
   * Checks if date is a holiday.
   *
   * @param date
   */
  isHoliday(date) {
    // TODO: test code
    if (date === '2026-12-25') {
      return true
    } else {
      return false
    }
  }

  /**
   *
   */
  // nextHoliday() {}

  /**
   *
   */
  // workdaysUntil(date) {}

  /**
   *
   */
  // workdaysBetween(date1, date2) {}

  /**
   *
   */
  // holidaysLeft() {}
}
