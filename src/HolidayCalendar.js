import { MovingHolidays } from './MovingHolidays.js'
import { DateHelpers } from './DateHelpers.js'

/**
 * Represents a calendar of public Swedish holidays.
 */
export class HolidayCalendar {
  #year
  #movingHolidays
  #helpers = new DateHelpers()
  #holidayDateStrings = []

  // All fixed holidays, the same date every year
  #fixedHolidays = [
    { name: "New Year's Day", month: '01', day: '01' },
    { name: 'Epiphany', month: '01', day: '06' },
    { name: 'First of May', month: '05', day: '01' },
    { name: 'National Day of Sweden', month: '06', day: '06' },
    { name: 'Christmas Day', month: '12', day: '25' },
    { name: 'Boxing Day', month: '12', day: '26' },
  ]

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
    const allHolidays = this.#compileAllHolidays()
    this.#compileHolidayDateStrings(allHolidays)
  }

  /**
   * Compiles all holidays into one array of objects, containing
   * name and date for each holiday.
   */
  #compileAllHolidays() {
    const fixedHolidays = this.#fixedHolidays.map((holiday) => ({
      name: holiday.name,
      date: new Date(`${this.#year}-${holiday.month}-${holiday.day}`),
    }))

    return [...fixedHolidays, ...this.#movingHolidays.getMovingHolidays()]
  }

  #compileHolidayDateStrings(allHolidays) {
    this.#holidayDateStrings = allHolidays.map((holiday) => this.#helpers.convertToString(holiday.date)).sort()
  }

  /**
   * Checks if given date is a holiday.
   *
   * @param {string} dateStr - The date to check.
   * @returns {boolean} - True if it is a holiday, false if not.
   */
  isHoliday(dateStr) {
    this.#helpers.validateYear(dateStr, this.#year)

    return this.#holidayDateStrings.includes(dateStr)
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

    const nextHoliday = this.#holidayDateStrings.find((holidayDate) => holidayDate > dateStr)

    return nextHoliday || `${this.#year + 1}-01-01`
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

    return !this.isHoliday(dateStr) && !this.#helpers.isWeekend(this.#helpers.convertToDate(dateStr))
  }

  /**
   * Counts number of workdays between today's date and the
   * given date. Does not count weekends or holidays.
   *
   * Caution: This method counts the start date but not the end date.
   *
   * @deprecated Use workdaysAfterTodayUntil instead.
   *
   * @param {string} dateStr - The given date.
   * @returns {number} The number of workdays.
   */
  workdaysFromTodayUntil(dateStr) {
    const today = this.#helpers.getTodaysDate()

    this.#helpers.validateYear(dateStr, this.#year)
    this.#helpers.validateYear(today, this.#year)

    return this.#findWorkdays(this.#excludeEndDate(this.#getDateStringsInRange(today, dateStr))).length
  }

  /**
   * Counts number of workdays between today's date and the
   * given date. Including the given end date but not today's date. Does
   * not include weekends or holidays.
   *
   * @param {string} dateStr - The given date.
   * @returns {number} The number of workdays.
   */
  workdaysAfterTodayUntil(dateStr) {
    this.#helpers.validateYear(dateStr, this.#year)

    return this.workdaysAfterUntil(this.#helpers.getTodaysDate(), dateStr)
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

    return this.#findWorkdays(this.#excludeEndDate(this.#getDateStringsInRange(startDateStr, endDateStr))).length
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

    return this.#findWorkdays(this.#excludeStartDate(this.#getDateStringsInRange(startDateStr, endDateStr))).length
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
    return this.#holidayDateStrings.filter((date) => date > this.#helpers.getTodaysDate()).length
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
    return dateStrings.filter((dateString) => this.isWorkday(dateString))
  }

  #excludeStartDate(dateStrings) {
    return dateStrings.slice(1)
  }

  #excludeEndDate(dateStrings) {
    return dateStrings.slice(0, -1)
  }
}
