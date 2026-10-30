import { MovingHolidays } from './MovingHolidays.js'
import { DateHelpers } from './DateHelpers.js'

/**
 * Represents a calendar of public Swedish holidays.
 */
export class HolidayCalendar {
  #year
  #movingHolidays
  #helpers = new DateHelpers()

  // All fixed holidays, the same date every year
  #fixedHolidays = [
    { name: "New Year's Day", month: '01', day: '01' },
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
    while (currentDate.getUTCFullYear() === this.#year && !this.isHoliday(this.#helpers.convertToString(currentDate))) {
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
  workdaysFromTodayUntil(dateStr) {
    this.#helpers.validateYear(dateStr, this.#year)

    const updatedDate = this.#helpers.addDays(this.#helpers.convertToDate(dateStr), -1)
    const updatedDateStr = this.#helpers.convertToString(updatedDate)

    const today = this.#helpers.getTodaysDate()

    return this.#findWorkdays(this.#getDateStringsInRange(today, updatedDateStr)).length
  }

  /**
   * Counts number of workdays between two given dates. Does
   * not count weekends or holidays.
   *
   * Caution: This method counts the start date but not the end date.
   *
   * @deprecated Use workdaysInPeriod or workdaysAfterUntil instead.
   *
   * @param {string} startDateStr - The given start date.
   * @param {string} endDateStr - The given end date.
   * @returns {number} The number of workdays between the dates.
   */
  workdaysBetween(startDateStr, endDateStr) {
    this.#helpers.validateYear(startDateStr, this.#year)
    this.#helpers.validateYear(endDateStr, this.#year)

    const updatedEndDate = this.#helpers.addDays(this.#helpers.convertToDate(endDateStr), -1)
    const updatedEndDateStr = this.#helpers.convertToString(updatedEndDate)

    return this.#findWorkdays(this.#getDateStringsInRange(startDateStr, updatedEndDateStr)).length
  }

  /**
   * Counts number of workdays in the given period, including the given end date
   * if it is a workday. Does not count the start date, weekends or holidays.
   *
   * @param {string} startDateStr - The given start date.
   * @param {string} endDateStr - The given end date.
   * @returns {number} The number of workdays in the period.
   */
  workdaysAfterUntil(startDateStr, endDateStr) {
    this.#helpers.validateYear(startDateStr, this.#year)
    this.#helpers.validateYear(endDateStr, this.#year)

    const updatedStartDate = this.#helpers.addDays(this.#helpers.convertToDate(startDateStr), 1)
    const updatedStartDateStr = this.#helpers.convertToString(updatedStartDate)

    return this.#findWorkdays(this.#getDateStringsInRange(updatedStartDateStr, endDateStr)).length
  }

  /**
   * Counts number of workdays in the given period, including the given
   * dates if they are workdays. Does not count weekends or holidays.
   *
   * @param {string} startDateStr - The given start date.
   * @param {string} endDateStr - The given end date.
   * @returns {number} The number of workdays in the period.
   */
  workdaysInPeriod(startDateStr, endDateStr) {
    this.#helpers.validateYear(startDateStr, this.#year)
    this.#helpers.validateYear(endDateStr, this.#year)

    return this.#findWorkdays(this.#getDateStringsInRange(startDateStr, endDateStr)).length
  }

  /**
   * Counts the number of holidays left this year from today's date.
   *
   * @returns {number} The number of holidays left this year.
   */
  holidaysLeftThisYear() {
    const todaysDate = this.#helpers.convertToDate(this.#helpers.getTodaysDate())
    let holidayCount = 0

    for (const holiday of this.#allHolidays) {
      if (holiday.date.getTime() > todaysDate.getTime()) {
        holidayCount++
      }
    }
    return holidayCount
  }

  #getDateStringsInRange(startDateStr, endDateStr) {
    const endDate = this.#helpers.convertToDate(endDateStr)
    const startDate = this.#helpers.convertToDate(startDateStr)
    const dates = []

    for (let date = startDate; date <= endDate; date = this.#helpers.addDays(date, 1)) {
      dates.push(this.#helpers.convertToString(date))
    }

    return dates
  }

  #findWorkdays(dateStrings) {
    const workdayDateStrings = []

    for (const dateString of dateStrings) {
      if (this.isWorkday(dateString)) {
        workdayDateStrings.push(dateString)
      }
    }

    return workdayDateStrings
  }
}
