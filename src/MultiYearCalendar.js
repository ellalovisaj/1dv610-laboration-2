import { HolidayCalendar } from './HolidayCalendar.js'

// TODO: workdaysBetween counts startDate but not endDate. Change to a new method that counts all days.
/**
 *
 */
export class MultiYearCalendar {
  #holidayCalendars = new Map()

  isHoliday(date) {
    const calendar = this.#getCalendarFor(this.#getYearOf(date))
    return calendar.isHoliday(date)
  }

  nextHolidayFrom(date) {
    const calendar = this.#getCalendarFor(this.#getYearOf(date))
    return calendar.nextHolidayFrom(date)
  }

  isWorkday(date) {
    const calendar = this.#getCalendarFor(this.#getYearOf(date))
    return calendar.isWorkday(date)
  }

  workdaysBetween(startDate, endDate) {
    if (this.#getYearOf(startDate) !== this.#getYearOf(endDate)) {
      return this.#workdaysBetweenDifferentYears(startDate, endDate)
    }

    const calendar = this.#getCalendarFor(this.#getYearOf(startDate))
    return calendar.workdaysBetween(startDate, endDate)
  }

  #workdaysBetweenDifferentYears(startDate, endDate) {
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
    const workdayCount = this.#getCalendarFor(year).workdaysBetween(
      this.#firstDayOfYear(year),
      this.#lastDayOfYear(year)
    )

    // TODO: Change to new method that counts all days and then remove added day
    return this.isWorkday(this.#lastDayOfYear(year)) ? workdayCount + 1 : workdayCount
  }

  #workdaysUntilEndOfYear(startDate) {
    const year = this.#getYearOf(startDate)
    const workdayCount = this.#getCalendarFor(year).workdaysBetween(startDate, this.#lastDayOfYear(year))

    // TODO: Change to new method that counts all days and then remove added day
    return this.isWorkday(this.#lastDayOfYear(year)) ? workdayCount + 1 : workdayCount
  }

  #workdaysFromStartOfYear(endDate) {
    const year = this.#getYearOf(endDate)
    return this.#getCalendarFor(year).workdaysBetween(this.#firstDayOfYear(year), endDate)
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
