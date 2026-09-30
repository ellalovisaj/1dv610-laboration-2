/**
 * Represents a calendar of public Swedish holidays.
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
    { name: 'New Year\'s Day', month: '01', day: '01' },
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
    if (!Number.isInteger(year) || year < 1900 || year > 2199) {
      throw new Error('The calendar module only support the years from 1900 to 2199.')
    }
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
      this.#allHolidays.push(tempHoliday)
    }
  }

  /**
   * Checks if date is a holiday.
   *
   * @param {string} dateStr - The date to check.
   * @returns {boolean} - True if it is a holiday, false if not.
   */
  isHoliday(dateStr) {
    this.#helpers.validateYear(dateStr, this.#year)

    for (const holiday of this.#allHolidays) {
      if (this.#helpers.convertToString(holiday.date) === dateStr) {
        return true
      }
    }
    return false
  }

  /**
   * Returns the next holiday date from the given date. If the given
   * date is a holiday, the next holiday date will be returned.
   *
   * @param {string} dateStr - The given date
   * @returns {string} The date of the next holiday
   */
  nextHolidayFrom(dateStr) {
    this.#helpers.validateYear(dateStr, this.#year)

    let currentDate = this.#helpers.addDays(this.#helpers.convertToDate(dateStr), 1)
    
    // For as long as the current date is this year and isn't a holiday
    while (
      currentDate.getFullYear() === this.#year &&
      !this.isHoliday(this.#helpers.convertToString(currentDate))
    ) {
      // Add 1 day to current date
      currentDate = this.#helpers.addDays(currentDate, 1)
    }

    // Will return the next holiday, and if there are no more
    // holidays this year, it will return the 1st of January
    // the coming year, which is also a holiday.
    return this.#helpers.convertToString(currentDate)
  }

  /**
   * Checks if the given date is a workday or not. A workday does
   * not fall on a weekend or a holiday.
   *
   * @param {string} dateStr - The given date.
   * @returns {boolean} True if it is a workday, false if not.
   */
  isWorkday(dateStr) {
    this.#helpers.validateYear(dateStr, this.#year)

    if (this.isHoliday(dateStr) || this.#helpers.isWeekend(this.#helpers.convertToDate(dateStr))) {
      return false
    }
    return true
  }

  /**
   * Counts number of workdays between today's date and the
   * given date. Does not count weekends or holidays.
   *
   * @param {string} dateStr - The given date.
   * @returns {number} The number of workdays.
   */
  workdaysUntil(dateStr) {
    this.#helpers.validateYear(dateStr, this.#year)

    const today = this.#helpers.getTodaysDate()

    return this.workdaysBetween(today, dateStr)
  }

  /**
   * Counts number of workdays between two given dates. Does
   * not count weekends or holidays.
   *
   * @param {string} startDateStr - The given start date.
   * @param {string} endDateStr - The given end date.
   * @returns {number} The number of workdays between the dates.
   */
  workdaysBetween(startDateStr, endDateStr) {
    this.#helpers.validateYear(startDateStr, this.#year)
    this.#helpers.validateYear(endDateStr, this.#year)

    let currentDate = this.#helpers.convertToDate(startDateStr)
    const endDate = this.#helpers.convertToDate(endDateStr)
    let workdayCount = 0

    while (currentDate.getTime() < endDate.getTime()) {
      const currentDateStr = this.#helpers.convertToString(currentDate)
      if (this.isWorkday(currentDateStr)) {
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
    const todaysDate = this.#helpers.convertToDate(this.#helpers.getTodaysDate())
    let holidayCount = 0

    for (const holiday of this.#allHolidays) {
      if (holiday.date.getTime() > todaysDate.getTime()) {
        holidayCount++
      }
    }
    return holidayCount
  }
}
