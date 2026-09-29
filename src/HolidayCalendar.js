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
    this.#compileAllHolidays()
  }

  /**
   * Compiles all holidays into one array of objects, containing
   * name and date for each holiday.
   */
  #compileAllHolidays() {
    this.#allHolidays = this.#movingHolidays.getMovingHolidays()
    for (const holiday of this.#fixedHolidays) {
      const tempHoliday = {
        name: holiday.name,
        date: new Date(`${this.#year}-${holiday.month}-${holiday.day}`),
      }
      this.#allHolidays.splice(0, 0, tempHoliday)
      // console.log(tempHoliday)
    }
    // console.log(this.#allHolidays)
  }

  /**
   * Checks if date is a holiday.
   *
   * @param {object} date - The date to check.
   * @returns {boolean} - True if it is a holiday, false if not.
   */
  isHoliday(date) {
    for (const holiday of this.#allHolidays) {
      console.log(holiday.date)
      if (holiday.date.getTime() === date.getTime()) {
        return true
      }
    }
    return false
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
