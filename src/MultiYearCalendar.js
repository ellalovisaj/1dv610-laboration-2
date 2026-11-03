import { HolidayCalendar } from './HolidayCalendar.js'
import { DateHelpers } from './DateHelpers.js'

export class MultiYearCalendar {
  #helpers = new DateHelpers()
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

  workdaysInPeriod(startDate, endDate) {
    if (this.#getYearOf(startDate) !== this.#getYearOf(endDate)) {
      return this.#workdaysInPeriodAcrossYears(startDate, endDate)
    }

    const calendar = this.#getCalendarFor(this.#getYearOf(startDate))
    return calendar.workdaysInPeriod(startDate, endDate)
  }

  workdaysAfterUntil(startDate, endDate) {
    return this.workdaysInPeriod(this.#helpers.addDaysToString(startDate, 1), endDate)
  }

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
    return this.#getCalendarFor(year).workdaysInPeriod(
      this.#firstDayOfYear(year),
      this.#lastDayOfYear(year)
    )
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
