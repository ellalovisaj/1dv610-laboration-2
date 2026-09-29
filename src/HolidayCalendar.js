/**
 * Module...
 */
import { MovingHolidays } from './MovingHolidays.js'

/**
 *
 */
export class HolidayCalendar {
  #year
  #movingHolidays

  // All fixed holidays, the same date every year
  #fixedHolidays = [
    { name: 'New Years Day', month: '01', day: '01' },
    { name: 'Epiphany', month: '01', day: '06' },
    { name: 'First of May', month: '05', day: '01' },
    { name: 'National Day of Sweden', month: '06', day: '06' },
    { name: 'Christmas Day', month: '12', day: '25' },
    { name: 'Boxing Day', month: '12', day: '26' },
  ]

  #allHolidays = []

  /**
   * Constructor.
   *
   * @param {number} year - The given year. 
   */
  constructor(year) {
    this.#year = year
    this.#movingHolidays = new MovingHolidays(year)
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
