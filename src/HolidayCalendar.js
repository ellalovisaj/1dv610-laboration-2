/**
 * Module...
 */
import { MovingHolidays } from './MovingHolidays.js'
import { DateHelpers } from './dateHelpers.js'

/**
 *
 */
export class HolidayCalendar {
  #year
  #movingHolidays
  #helpers = new DateHelpers()

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
      if (holiday.date.getTime() === date.getTime()) {
        return true
      }
    }
    return false
  }

  // TODO: Will not work when next holiday is in the next year
  /**
   * Returns the next holiday date from the given date. If the given
   * date is a holiday, the next holiday date will be returned.
   *
   * @param {object} date - The given date
   * @returns {object} The date of the next holiday
   */
  nextHolidayFrom(date) {
    let currentDate = this.#helpers.addDays(date, 1)

    // For as long as the current date isn't a holiday
    while (!this.isHoliday(currentDate)) {
      // Add 1 day to current date
      currentDate = this.#helpers.addDays(currentDate, 1)
    }
    return currentDate
  }

  /**
   * Checks if the given date is a workday or not. A workday does
   * not fall on a weekend or a holiday.
   *
   * @param {object} date - The given date.
   * @returns {boolean} True if it is a workday, false if not.
   */
  isWorkday(date) {
    if (this.isHoliday(date) || this.#helpers.isWeekend(date)) {
      return false
    }
    return true
  }

  /**
   * Counts number of workdays between today's date and the
   * given date. Does not count weekends or holidays.
   *
   * @param {object} date - The given date.
   * @returns {number} The number of workdays.
   */
  workdaysUntil(date) {
    const startDate = new Date()

    return this.workdaysBetween(startDate, date)
  }

  /**
   * Counts number of workdays between two given dates. Does
   * not count weekends or holidays.
   *
   * @param {object} startDate - The given start date.
   * @param {object} endDate - The given end date.
   * @returns {number} The number of workdays between the dates.
   */
  workdaysBetween(startDate, endDate) {
    let currentDate = startDate
    let workdayCount = 0

    while (currentDate.getTime() < endDate.getTime()) {
      if (this.isWorkday(currentDate)) {
        workdayCount++
      }
      currentDate = this.#helpers.addDays(currentDate, 1)
    }
    return workdayCount
  }

  /**
   * Counts the number of holidays left this year from today's date.
   * 
   * @returns {number} The number of holidays left this year.
   */
  holidaysLeft() {
    const today = new Date()
    let holidayCount = 0

    for (const holiday of this.#allHolidays) {
      if (holiday.date.getTime() > today.getTime()) {
        holidayCount++
      }
    }
    return holidayCount
  }
}
