import { DateCalculator } from "./DateCalculator.js"

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
  validateYearHolidayCalendar(dateString, year) {
    const date = this.#calculator.convertToDate(dateString)

    if (date.getUTCFullYear() !== year) {
      throw new Error('Date is outside this calendar year.')
    }
  }

  validateDate(dateStr) {
    if (!this.#isValidDate(dateStr)) {
      throw new Error('Invalid date, use the format `YYYY-MM-DD`.')
    }
  }

  #isValidDate(dateStr) {
    const date = new Date(dateStr)
    return !Number.isNaN(date.getTime()) && this.#calculator.convertToString(date) === dateStr
  }
}