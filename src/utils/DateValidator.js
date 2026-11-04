import { DateCalculator } from './DateCalculator.js'

/**
 * Encapsulates methods that validates dates and values related to dates.
 */
export class DateValidator {
  #calculator = new DateCalculator()

  /**
   * Checks if date falls in current holiday calendar's year. Only needed
   * to ensure HolidayCalendar's public methods still work.
   *
   * Can be removed in future major update if HolidayCalender methods is
   * made private.
   */
  validateYearInCalendarYear(dateString, year) {
    this.validateDateString(dateString)
    if (this.#calculator.getYearOf(dateString) !== year) {
      throw new Error('Date is outside this calendar year.')
    }
  }

  validateDateString(dateString) {
    if (!this.#isValidDate(dateString)) {
      throw new Error('Invalid date, use the format `YYYY-MM-DD`.')
    }
    if (!this.#hasValidYear(dateString)) {
      throw new Error('The calendar module only support the years from 1900 to 2199.')
    }
  }

  #hasValidYear(dateString) {
    const year = this.#calculator.getYearOf(dateString)
    return year >= 1900 && year <= 2199
  }

  #isValidDate(dateString) {
    const date = new Date(dateString)
    return !Number.isNaN(date.getTime()) && this.#calculator.convertToString(date) === dateString
  }

  validateWorkdays(days) {
    if (!Number.isInteger(days)) {
      throw new Error('Invalid workdays count: Must be an integer')
    }
    if (days <= 0) {
      throw new Error('Invalid workdays count: Must be greater than 0')
    }
  }
}
