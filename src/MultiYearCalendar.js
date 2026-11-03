import { HolidayCalendar } from './HolidayCalendar.js'
import { DateHelpers } from './DateHelpers.js'

/**
 * Represents a calendar of public Swedish holidays with multi-year support. It can support years
 * from 1900 to 2199. Will throw an error if the date is invalid or if it occurs outside of the allowed span of years.
 */
export class MultiYearCalendar {
  #helpers = new DateHelpers()
  #holidayCalendars = new Map()

  /**
   * Checks if given date is a holiday.
   *
   * @param {string} dateStr - The date to check.
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
   * @param {string} dateStr - The given date.
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
   * @param {string} dateStr - The given date
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
   * @param {string} startDateStr - The given start date.
   * @param {string} endDateStr - The given end date.
   * @returns {number} The number of workdays in the period.
   */
  workdaysAfterUntil(startDate, endDate) {
    return this.workdaysInPeriod(this.#helpers.addDaysToString(startDate, 1), endDate)
  }

  /**
   * Counts number of workdays in the given period, including the given
   * dates if they are workdays. Does not count weekends or holidays.
   *
   * @param {string} startDateStr - The given start date.
   * @param {string} endDateStr - The given end date.
   * @returns {number} The number of workdays in the period.
   */
  workdaysInPeriod(startDate, endDate) {
    if (this.#getYearOf(startDate) !== this.#getYearOf(endDate)) {
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
   * @param {string} dateStr - The given date.
   * @returns {number} The number of workdays.
   */
  // TODO: workdaysAfterTodayUntil() {}

  /**
   * Counts the number of holidays left this year from today's date.
   *
   * @returns {number} The number of holidays left this year.
   */
  // TODO: holidaysLeftThisYear() {}

  // TODO: addWorkdays() {}

  #workdaysInPeriodAcrossYears(startDate, endDate) {
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

  #getCalendarFor(year) {
    if (!this.#holidayCalendars.has(year)) {
      this.#holidayCalendars.set(year, new HolidayCalendar(year))
    }

    return this.#holidayCalendars.get(year)
  }
}
