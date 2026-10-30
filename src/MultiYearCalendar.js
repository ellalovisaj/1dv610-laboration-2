import { HolidayCalendar } from './HolidayCalendar.js'

/**
 * 
 */
export class MultiYearCalendar {
  #holidayCalendars = new Map()

  isHoliday(dateStr) {
    const calendar = this.#getCalendarFor(this.#getYearOf(dateStr))
    return calendar.isHoliday(dateStr)
  }

  #getYearOf(date) {
    return new Date(date).getFullYear()
  }

  #getCalendarFor(year) {
    if (this.#holidayCalendars.has(year)) {
      return this.#holidayCalendars.get(year)
    }

    this.#holidayCalendars.set(year, new HolidayCalendar(year))
  }
}
