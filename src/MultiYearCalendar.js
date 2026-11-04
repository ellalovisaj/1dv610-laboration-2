import { HolidayCalendar } from './HolidayCalendar.js'
import { DateHelpers } from './DateHelpers.js'

/**
 * Represents a calendar of public Swedish holidays with multi-year support. It can support years
 * from 1900 to 2199. Will throw an error if the date is invalid or if it occurs outside of the allowed span of years.
 *
 * Please note that all dates are written as strings in the `YYYY-MM-DD` format. See examples in README.md.
 */
export class MultiYearCalendar {
  #helpers = new DateHelpers()
  #holidayCalendars = new Map()

  /**
   * Checks if given date is a holiday.
   *
   * @param {string} date - The date to check.
   * @returns {boolean} - True if it is a holiday, false if not.
   */
  isHoliday(date) {
    const calendar = this.#getCalendarFor(this.#getYearOf(date))
    return calendar.isHoliday(date)
  }

  /**
   * Checks if the given date is a workday or not. A workday does
   * not fall on a weekend or a holiday.
   *
   * @param {string} date - The given date.
   * @returns {boolean} True if it is a workday, false if not.
   */
  isWorkday(date) {
    const calendar = this.#getCalendarFor(this.#getYearOf(date))
    return calendar.isWorkday(date)
  }

  /**
   * Returns the next holiday date from the given date. If the given
   * date is a holiday, the next holiday date will be returned.
   *
   * @param {string} date - The given date
   * @returns {string} The date of the next holiday
   */
  nextHolidayFrom(date) {
    const calendar = this.#getCalendarFor(this.#getYearOf(date))
    return calendar.nextHolidayFrom(date)
  }

  /**
   * Counts number of workdays in the given period, including the given end date
   * if it is a workday. Does not count the start date, weekends or holidays.
   *
   * @param {string} startDate - The given start date.
   * @param {string} endDate - The given end date.
   * @returns {number} The number of workdays in the period.
   */
  workdaysAfterUntil(startDate, endDate) {
    this.#validateDates(startDate, endDate)
    if (this.#isSameDate(startDate, endDate) || startDate > endDate) return 0
    return this.workdaysInPeriod(this.#helpers.addDaysToString(startDate, 1), endDate)
  }

  /**
   * Counts number of workdays in the given period, including the given
   * dates if they are workdays. Does not count weekends or holidays.
   *
   * @param {string} startDate - The given start date.
   * @param {string} endDate - The given end date.
   * @returns {number} The number of workdays in the period.
   */
  workdaysInPeriod(startDate, endDate) {
    this.#validateDates(startDate, endDate)
    if (startDate > endDate) return 0

    if (this.#isDifferentYears(startDate, endDate)) {
      return this.#workdaysInPeriodAcrossYears(startDate, endDate)
    }

    const calendar = this.#getCalendarFor(this.#getYearOf(startDate))
    return calendar.workdaysInPeriod(startDate, endDate)
  }

  /**
   * Counts number of workdays between today's date and the
   * given date. Including the given end date but not today's date. Does
   * not include weekends or holidays.
   *
   * @param {string} date - The given date.
   * @returns {number} The number of workdays.
   */
  workdaysAfterTodayUntil(date) {
    this.#validateDates(date)
    return this.workdaysAfterUntil(this.#helpers.getTodaysDate(), date)
  }

  /**
   * Counts the number of holidays left this year from today's date.
   *
   * @returns {number} The number of holidays left this year.
   */
  holidaysLeftThisYear() {
    return this.#getCalendarOfCurrentYear().holidaysLeftThisYear()
  }

  /**
   * Returns the date that is the given number of workdays after the given
   * date. The start date is not counted. Holidays and weekends are skipped.
   *
   * Example: addWorkdays('2026-10-30', 1) returns '2026-11-02', since
   * Friday the 30th is not counted and the weekend is skipped.
   *
   * @param {string} date - The given start date.
   * @param {number} workdays - The given amount of workdays to add.
   * @returns {string} The new date, with the workdays added.
   */
  addWorkdays(date, workdays) {
    this.#validateDates(date)
    this.#validateWorkdays(workdays)

    while (workdays > 0) {
      date = this.#helpers.addDaysToString(date, 1)
      if (this.isWorkday(date)) {
        workdays--
      }
    }
    return date
  }

  #workdaysInPeriodAcrossYears(startDate, endDate) {
    this.#validateDates(startDate, endDate)

    const startYear = this.#getYearOf(startDate)
    const endYear = this.#getYearOf(endDate)

    let workdayCount = this.#workdaysUntilEndOfYear(startDate)

    // For any years between start and end year
    for (let year = startYear + 1; year < endYear; year++) {
      workdayCount += this.#workdaysOfFullYear(year)
    }

    workdayCount += this.#workdaysFromStartOfYear(endDate)

    return workdayCount
  }

  #workdaysOfFullYear(year) {
    return this.#getCalendarFor(year).workdaysInPeriod(this.#firstDayOfYear(year), this.#lastDayOfYear(year))
  }

  #workdaysUntilEndOfYear(startDate) {
    const year = this.#getYearOf(startDate)
    return this.#getCalendarFor(year).workdaysInPeriod(startDate, this.#lastDayOfYear(year))
  }

  #workdaysFromStartOfYear(endDate) {
    const year = this.#getYearOf(endDate)
    return this.#getCalendarFor(year).workdaysInPeriod(this.#firstDayOfYear(year), endDate)
  }

  #firstDayOfYear(year) {
    return `${year}-01-01`
  }

  #lastDayOfYear(year) {
    return `${year}-12-31`
  }

  #getYearOf(date) {
    return new Date(date).getUTCFullYear()
  }

  #isDifferentYears(firstDate, secondDate) {
    return this.#getYearOf(firstDate) !== this.#getYearOf(secondDate)
  }

  #isSameDate(firstDate, secondDate) {
    return firstDate === secondDate
  }

  #getCalendarFor(year) {
    if (!this.#holidayCalendars.has(year)) {
      this.#holidayCalendars.set(year, new HolidayCalendar(year))
    }

    return this.#holidayCalendars.get(year)
  }

  #getCalendarOfCurrentYear() {
    return this.#getCalendarFor(this.#getCurrentYear())
  }

  #getCurrentYear() {
    return this.#getYearOf(this.#helpers.getTodaysDate())
  }

  #validateDates(...dates) {
    for (const date of dates) {
      this.#validateDate(date)
      this.#getCalendarFor(this.#getYearOf(date))
    }
  }

  #validateWorkdays(days) {
    if (days % 1 === 0 && days > 0) {
      return
    }
    throw new Error('Workdays must be a positive integer')
  }

  #isValidDate(dateStr) {
   const date = new Date(dateStr)
   return !Number.isNaN(date.getTime()) && this.#helpers.convertToString(date) === dateStr
  }

  #validateDate(dateStr) {
    if (!this.#isValidDate(dateStr)) {
      throw new Error('invalid date')
    }
  }
}
