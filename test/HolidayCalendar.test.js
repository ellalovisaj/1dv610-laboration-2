import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { HolidayCalendar } from '../src/HolidayCalendar.js'

describe('Holiday Calendar', () => {
  test('should accept creating a calendar of a year within allowed range', () => {
    expect(() => new HolidayCalendar(2026)).not.toThrow()
  })

  test('should accept creating a calendar of a leap year', () => {
    expect(() => new HolidayCalendar(2028)).not.toThrow()
  })

  test('should accept creating a calendar of 2027', () => {
    expect(() => new HolidayCalendar(2027)).not.toThrow()
  })

  test('should accept creating a calendar of the first supported year', () => {
    expect(() => new HolidayCalendar(1900)).not.toThrow()
  })

  test('should accept creating a calendar of the last supported year', () => {
    expect(() => new HolidayCalendar(2199)).not.toThrow()
  })

  test('should throw error when creating a calendar of a year before 1900', () => {
    expect(() => new HolidayCalendar(1899)).toThrow()
  })

  test('should throw error when creating a calendar of a year after 2199', () => {
    expect(() => new HolidayCalendar(2200)).toThrow()
  })
})

describe('isHoliday', () => {
  test('should return true for Christmas Day', () => {
    const calendar = new HolidayCalendar(2026)

    expect(calendar.isHoliday('2026-12-25')).toBe(true)
  })

  test('should return false for Christmas Eve', () => {
    const calendar = new HolidayCalendar(2026)

    expect(calendar.isHoliday('2026-12-24')).toBe(false)
  })

  test('should return true for Easter Sunday', () => {
    const calendar = new HolidayCalendar(2026)

    expect(calendar.isHoliday('2026-04-05')).toBe(true)
  })

  test('should throw error when giving an invalid date', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isHoliday('2026-13-25')).toThrow()
  })

  test('should throw error when giving an invalid year', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isHoliday('2024-10-22')).toThrow()
  })
})

describe('nextHolidayFrom', () => {
  test('should find the date of the next holiday', () => {
    const calendar = new HolidayCalendar(2026)
    const workday = '2026-09-30'

    expect(calendar.nextHolidayFrom(workday)).toBe('2026-10-31')
  })

  test('should be able to find the first holiday in the next year when it is next', () => {
    const calendar = new HolidayCalendar(2026)
    const date = '2026-12-30'

    expect(calendar.nextHolidayFrom(date)).toBe('2027-01-01')
  })

  test('should not return the given date if it is a holiday, but instead the next holiday', () => {
    const calendar = new HolidayCalendar(2026)
    const holiday = '2026-12-25'

    expect(calendar.nextHolidayFrom(holiday)).toBe('2026-12-26')
  })

  test('should throw error when giving an invalid date', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.nextHolidayFrom('2026-13-25')).toThrow()
  })

  test('should throw error when giving an invalid year', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.nextHolidayFrom('2024-10-22')).toThrow()
  })
})

describe('isWorkday', () => {
  test('should return true when given a workday date', () => {
    const calendar = new HolidayCalendar(2026)
    const workday = '2026-09-30'

    expect(calendar.isWorkday(workday)).toBe(true)
  })

  test('should return false when given a weekend date', () => {
    const calendar = new HolidayCalendar(2026)
    const weekend = '2026-10-10'

    expect(calendar.isWorkday(weekend)).toBe(false)
  })

  test('should return false when given a holiday date', () => {
    const calendar = new HolidayCalendar(2026)
    const holiday = '2026-12-25'

    expect(calendar.isWorkday(holiday)).toBe(false)
  })

  test('should throw error when giving an invalid date', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isWorkday('2026-13-25')).toThrow()
  })

  test('should throw error when giving an invalid year', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isWorkday('2024-10-22')).toThrow()
  })
})

describe('workdaysFromTodayUntil', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should find number of workdays left, from today until given date', () => {
    vi.setSystemTime('2026-10-14')
    const calendar = new HolidayCalendar(2026)

    expect(calendar.workdaysFromTodayUntil('2026-10-31')).toBe(13)
  })

  test('should count today but not end date', () => {
    vi.setSystemTime('2026-10-14')
    const calendar = new HolidayCalendar(2026)

    expect(calendar.workdaysFromTodayUntil('2026-10-19')).toBe(3)
  })

  test('should return 0 when the given date is today', () => {
    vi.setSystemTime('2026-10-14')
    const calendar = new HolidayCalendar(2026)

    expect(calendar.workdaysFromTodayUntil('2026-10-14')).toBe(0)
  })

  test('should return 0 when the date has passed', () => {
    vi.setSystemTime('2026-10-14')
    const calendar = new HolidayCalendar(2026)

    expect(calendar.workdaysFromTodayUntil('2026-10-13')).toBe(0)
  })

  test('should not count holidays', () => {
    vi.setSystemTime('2026-12-21')
    const calendar = new HolidayCalendar(2026)

    expect(calendar.workdaysFromTodayUntil('2026-12-28')).toBe(4)
  })

  test('should not count weekends', () => {
    vi.setSystemTime('2026-10-17')
    const calendar = new HolidayCalendar(2026)

    expect(calendar.workdaysFromTodayUntil('2026-10-20')).toBe(1)
  })

  test('should throw error when the given date is in another year', () => {
    vi.setSystemTime('2026-10-14')
    const calendar = new HolidayCalendar(2026)

    expect(() => {calendar.workdaysFromTodayUntil('2027-01-20')}).toThrow()
  })

  test('should throw error when the given date is in another year', () => {
    vi.setSystemTime('2026-10-14')
    const calendar = new HolidayCalendar(2026)

    expect(() => {calendar.workdaysFromTodayUntil('2027-01-20')}).toThrow()
  })

})

describe('workdaysBetween', () => {
  test('should not count weekends', () => {
    const calendar = new HolidayCalendar(2026)
    const startDate = '2026-10-09'
    const endDate = '2026-10-11'

    expect(calendar.workdaysBetween(startDate, endDate)).toBe(1)
  })

  test('should not count holidays', () => {
    const calendar = new HolidayCalendar(2026)
    const startDate = '2026-12-23'
    const endDate = '2026-12-26'

    expect(calendar.workdaysBetween(startDate, endDate)).toBe(2)
  })

  test('should account for leap years', () => {
    const calendar = new HolidayCalendar(2028)
    const startDate = '2028-02-28'
    const endDate = '2028-03-01'

    expect(calendar.workdaysBetween(startDate, endDate)).toBe(2)
  })

  test('should throw error when giving an invalid date', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.workdaysBetween('2026-13-25')).toThrow()
  })

  test('should throw error when giving an invalid year', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.workdaysBetween('2024-10-22')).toThrow()
  })
})

describe('holidaysLeftThisYear', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should find number of holidays left this year, after today', () => {
    vi.setSystemTime('2026-10-14')
    const calendar = new HolidayCalendar(2026)

    expect(calendar.holidaysLeftThisYear()).toBe(3)
  })

  test('should not count today if it is a holiday', () => {
    vi.setSystemTime('2026-12-25')
    const calendar = new HolidayCalendar(2026)

    expect(calendar.holidaysLeftThisYear()).toBe(1)
  })

  test('should return 0 if there are no holidays left', () => {
    vi.setSystemTime('2026-12-26')
    const calendar = new HolidayCalendar(2026)

    expect(calendar.holidaysLeftThisYear()).toBe(0)
  })
})

