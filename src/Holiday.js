/**
 * Module...
 */
export class Holiday {
  #year

  // All fixed holidays, the same date every year
  #fixedHolidays = [
    { name: 'New Years Day', month: 1, day: 1 },
    { name: 'Epiphany', month: 1, day: 6 },
    { name: 'First of May', month: 5, day: 1 },
    { name: 'National Day of Sweden', month: 6, day: 6 },
    { name: 'Christmas Day', month: 12, day: 25 },
    { name: 'Boxing Day', month: 12, day: 26 },
  ]

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
