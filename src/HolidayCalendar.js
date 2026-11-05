import { MovingHolidays } from './MovingHolidays.js'
import { DateCalculator } from './utils/DateCalculator.js'
import { DateValidator } from './utils/DateValidator.js'

/**
 * @deprecated Previously the main public class. Please use MultiYearCalendar instead.
 *
 * Represents a calendar of public Swedish holidays.
 */
export class HolidayCalendar {
  #year
  #movingHolidays
  #calculator = new DateCalculator()
  #validator = new DateValidator()
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
    this.#validator.validateYear(year)
    
    this.#year = year
    this.#movingHolidays = new MovingHolidays(year)
    const allHolidays = this.#compileAllHolidays()
    this.#compileHolidayDateStrings(allHolidays)
  }

  /**
   * Checks if given date is a holiday.
   *
   * @param {string} dateString - The date to check.
   * @returns {boolean} - True if it is a holiday, false if not.
   */
  isHoliday(dateString) {
    this.#validator.validateYearInCalendarYear(dateString, this.#year)
    return this.#isHoliday(dateString)
  }

  /**
   * Checks if the given date is a workday or not. A workday does
   * not fall on a weekend or a holiday.
   *
   * @param {string} dateString - The given date.
   * @returns {boolean} True if it is a workday, false if not.
   */
  isWorkday(dateString) {
    this.#validator.validateYearInCalendarYear(dateString, this.#year)
    return this.#isWorkday(dateString)
  }

  /**
   * Returns the next holiday date from the given date. If the given
   * date is a holiday, the next holiday date will be returned.
   *
   * @param {string} dateString - The given date
   * @returns {string} The date of the next holiday
   */
  nextHolidayFrom(dateString) {
    this.#validator.validateYearInCalendarYear(dateString, this.#year)

    const nextHoliday = this.#holidayDateStrings.find((holidayDate) => holidayDate > dateString)

    return nextHoliday || `${this.#year + 1}-01-01`
  }

  /**
   * Counts number of workdays in the given period, including the given end date
   * if it is a workday. Does not count the start date, weekends or holidays.
   *
   * @param {string} startDateString - The given start date.
   * @param {string} endDateString - The given end date.
   * @returns {number} The number of workdays in the period.
   */
  workdaysAfterUntil(startDateString, endDateString) {
    this.#validator.validateYearInCalendarYear(startDateString, this.#year)
    this.#validator.validateYearInCalendarYear(endDateString, this.#year)

    return this.#findWorkdays(
      this.#calculator.excludeStartDate(this.#getDateStringsInRange(startDateString, endDateString))
    ).length
  }

  /**
   * Counts number of workdays in the given period, including the given
   * dates if they are workdays. Does not count weekends or holidays.
   *
   * @param {string} startDateString - The given start date.
   * @param {string} endDateString - The given end date.
   * @returns {number} The number of workdays in the period.
   */
  workdaysInPeriod(startDateString, endDateString) {
    this.#validator.validateYearInCalendarYear(startDateString, this.#year)
    this.#validator.validateYearInCalendarYear(endDateString, this.#year)

    return this.#findWorkdays(this.#getDateStringsInRange(startDateString, endDateString)).length
  }

  /**
   * Counts number of workdays between today's date and the
   * given date. Including the given end date but not today's date. Does
   * not include weekends or holidays.
   *
   * @param {string} dateString - The given date.
   * @returns {number} The number of workdays.
   */
  workdaysAfterTodayUntil(dateString) {
    this.#validator.validateYearInCalendarYear(dateString, this.#year)
    return this.workdaysAfterUntil(this.#calculator.getTodaysDateString(), dateString)
  }

  /**
   * Counts the number of holidays left this year from today's date.
   *
   * @returns {number} The number of holidays left this year.
   */
  holidaysLeftThisYear() {
    return this.#holidayDateStrings.filter((date) => date > this.#calculator.getTodaysDateString()).length
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
    this.#holidayDateStrings = allHolidays.map((holiday) => this.#calculator.convertToString(holiday.date)).sort()
  }

  #getDateStringsInRange(startDateStr, endDateStr) {
    const endDate = this.#calculator.convertToDate(endDateStr)
    const startDate = this.#calculator.convertToDate(startDateStr)
    const dates = []

    for (let date = startDate; date <= endDate; date = this.#calculator.addDaysTo(date, 1)) {
      dates.push(this.#calculator.convertToString(date))
    }

    return dates
  }

  #findWorkdays(dateStrings) {
    return dateStrings.filter((dateString) => this.#isWorkday(dateString))
  }

  #isWorkday(dateString) {
    return !this.#isHoliday(dateString) && !this.#calculator.isWeekend(this.#calculator.convertToDate(dateString))
  }

  #isHoliday(dateString) {
    return this.#holidayDateStrings.includes(dateString)
  }

  /**
   * @deprecated Use workdaysAfterTodayUntil instead.
   *
   * Counts number of workdays between today's date and the
   * given date. Does not count weekends or holidays.
   *
   * Caution: This method counts the start date but not the end date.
   *
   * @param {string} dateString - The given date.
   * @returns {number} The number of workdays.
   */
  workdaysFromTodayUntil(dateString) {
    const today = this.#calculator.getTodaysDateString()

    this.#validator.validateYearInCalendarYear(dateString, this.#year)
    this.#validator.validateYearInCalendarYear(today, this.#year)

    return this.#findWorkdays(this.#calculator.excludeEndDate(this.#getDateStringsInRange(today, dateString))).length
  }

  /**
   * @deprecated Use workdaysInPeriod or workdaysAfterUntil instead.
   *
   * Counts number of workdays between two given dates. Does
   * not count weekends or holidays.
   *
   * Caution: This method counts the start date but not the end date.
   *
   * @param {string} startDateString - The given start date.
   * @param {string} endDateString - The given end date.
   * @returns {number} The number of workdays between the dates.
   */
  workdaysBetween(startDateString, endDateString) {
    this.#validator.validateYearInCalendarYear(startDateString, this.#year)
    this.#validator.validateYearInCalendarYear(endDateString, this.#year)

    return this.#findWorkdays(
      this.#calculator.excludeEndDate(this.#getDateStringsInRange(startDateString, endDateString))
    ).length
  }
}
