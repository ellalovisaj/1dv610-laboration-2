import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { MultiYearCalendar } from '../src/MultiYearCalendar.js'

describe('MultiYearCalendar', () => {
  describe('isHoliday', () => {
    test('should return true for Christmas Day', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.isHoliday('2026-12-25')).toBe(true)
    })

    test('should return false for Christmas Eve', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.isHoliday('2026-12-24')).toBe(false)
    })

    test('should return true for Easter Sunday', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.isHoliday('2026-04-05')).toBe(true)
    })

    test('should be able to find holidays in different years', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.isHoliday('2026-12-25')).toBe(true)
      expect(calendar.isHoliday('2028-06-06')).toBe(true)
      expect(calendar.isHoliday('2030-01-01')).toBe(true)
    })

    test('should throw error when giving an invalid date', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.isHoliday('2026-13-25')).toThrow('Invalid date')
    })
  })

  describe('isWorkday', () => {
    test('should return true when given a workday date', () => {
      const calendar = new MultiYearCalendar()
      const workday = '2026-09-30'

      expect(calendar.isWorkday(workday)).toBe(true)
    })

    test('should return false when given a weekend date', () => {
      const calendar = new MultiYearCalendar()
      const weekend = '2026-10-10'

      expect(calendar.isWorkday(weekend)).toBe(false)
    })

    test('should return false when given a holiday date', () => {
      const calendar = new MultiYearCalendar()
      const holiday = '2026-12-25'

      expect(calendar.isWorkday(holiday)).toBe(false)
    })

    test('should throw error when giving an invalid date', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.isWorkday('2026-13-25')).toThrow('Invalid date')
    })

    test('should be able to return true for workday dates in different years', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.isWorkday('2026-06-12')).toBe(true)
      expect(calendar.isWorkday('2028-08-15')).toBe(true)
      expect(calendar.isWorkday('2030-05-03')).toBe(true)
    })
  })

  describe('nextHolidayFrom', () => {
    test('should find the date of the next holiday', () => {
      const calendar = new MultiYearCalendar()
      const workday = '2026-09-30'

      expect(calendar.nextHolidayFrom(workday)).toBe('2026-10-31')
    })

    test('should be able to find the first holiday in the next year when it is next', () => {
      const calendar = new MultiYearCalendar()
      const date = '2026-12-30'

      expect(calendar.nextHolidayFrom(date)).toBe('2027-01-01')
    })

    test('should not return the given date if it is a holiday, but instead the next holiday', () => {
      const calendar = new MultiYearCalendar()
      const holiday = '2026-12-25'

      expect(calendar.nextHolidayFrom(holiday)).toBe('2026-12-26')
    })

    test('should throw error when giving an invalid date', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.nextHolidayFrom('2026-13-25')).toThrow('Invalid date')
    })

    test('should be able to find next holiday from dates in different years', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.nextHolidayFrom('2026-12-29')).toBe('2027-01-01')
      expect(calendar.nextHolidayFrom('2028-06-05')).toBe('2028-06-06')
      expect(calendar.nextHolidayFrom('2030-01-01')).toBe('2030-01-06')
    })
  })

  describe('workdaysInPeriod', () => {
    test('should not count weekends', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-10-09'
      const endDate = '2026-10-11'

      expect(calendar.workdaysInPeriod(startDate, endDate)).toBe(1)
    })

    test('should not count holidays', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-12-23'
      const endDate = '2026-12-26'

      expect(calendar.workdaysInPeriod(startDate, endDate)).toBe(2)
    })

    test('should account for leap years', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2028-02-28'
      const endDate = '2028-03-01'

      expect(calendar.workdaysInPeriod(startDate, endDate)).toBe(3)
    })

    test('should count workdays in a period that carry over into a new year', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-11-02'
      const endDate = '2027-01-15'

      expect(calendar.workdaysInPeriod(startDate, endDate)).toBe(52)
    })

    test('should return 0 when the end date is in an earlier year', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.workdaysInPeriod('2027-01-05', '2026-12-30')).toBe(0)
    })

    test('should count workdays in a period that spans over multiple years', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2025-09-02'
      const endDate = '2030-05-04'

      expect(calendar.workdaysInPeriod(startDate, endDate)).toBe(1185)
    })

    test('should throw error when giving an invalid date', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.workdaysInPeriod('2026-13-25')).toThrow('Invalid date')
    })
  })

  describe('workdaysAfterUntil', () => {
    test('should not count the start date but count the end date', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-10-26'
      const endDate = '2026-10-30'

      expect(calendar.workdaysAfterUntil(startDate, endDate)).toBe(4)
    })

    test('should return 0 when start and end date are the same', () => {
      const calendar = new MultiYearCalendar()
      const date = '2026-10-30'

      expect(calendar.workdaysAfterUntil(date, date)).toBe(0)
    })

    test('should return 0 when the end date is before the start date', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-10-30'
      const endDate = '2026-10-26'

      expect(calendar.workdaysAfterUntil(startDate, endDate)).toBe(0)
    })

    test('should not count weekends', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-10-08'
      const endDate = '2026-10-11'

      expect(calendar.workdaysAfterUntil(startDate, endDate)).toBe(1)
    })

    test('should not count holidays', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-12-23'
      const endDate = '2026-12-28'

      expect(calendar.workdaysAfterUntil(startDate, endDate)).toBe(2)
    })

    test('should account for leap years', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2028-02-28'
      const endDate = '2028-03-01'

      expect(calendar.workdaysAfterUntil(startDate, endDate)).toBe(2)
    })

    test('should not count December 31 when it is the start date', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-12-31'
      const endDate = '2027-01-04'

      expect(calendar.workdaysAfterUntil(startDate, endDate)).toBe(1)
    })

    test('should count workdays in a period that carry over into a new year', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-11-02'
      const endDate = '2027-01-15'

      expect(calendar.workdaysAfterUntil(startDate, endDate)).toBe(51)
    })

    test('should count workdays in a period that spans over multiple years', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2025-09-02'
      const endDate = '2030-05-03'

      expect(calendar.workdaysAfterUntil(startDate, endDate)).toBe(1184)
    })

    test('should return 0 when start and end date are December 31', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.workdaysAfterUntil('2026-12-31', '2026-12-31')).toBe(0)
    })

    test('should throw error when giving an invalid date', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.workdaysAfterUntil('2026-13-25', '2026-12-31')).toThrow('Invalid date')
    })
  })

  describe('workdaysAfterTodayUntil', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    test('should count workdays after today until the given date', () => {
      vi.setSystemTime(new Date('2026-10-28T12:00:00'))
      const calendar = new MultiYearCalendar()

      expect(calendar.workdaysAfterTodayUntil('2026-10-30')).toBe(2)
    })

    test('should count workdays into the next year', () => {
      vi.setSystemTime(new Date('2026-12-21T12:00:00'))
      const calendar = new MultiYearCalendar()

      expect(calendar.workdaysAfterTodayUntil('2027-01-08')).toBe(11)
    })

    test('should return 0 when the given date is today', () => {
      vi.setSystemTime(new Date('2026-10-28T12:00:00'))
      const calendar = new MultiYearCalendar()

      expect(calendar.workdaysAfterTodayUntil('2026-10-28')).toBe(0)
    })

    test('should return 0 when the given date is in a previous year', () => {
      vi.setSystemTime(new Date('2026-10-28T12:00:00'))
      const calendar = new MultiYearCalendar()

      expect(calendar.workdaysAfterTodayUntil('2025-12-01')).toBe(0)
    })
  })

  describe('holidaysLeftThisYear', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    test('should count the holidays left this year', () => {
      vi.setSystemTime(new Date('2026-11-03T12:00:00'))
      const calendar = new MultiYearCalendar()

      expect(calendar.holidaysLeftThisYear()).toBe(2)
    })

    test('should not count today when today is a holiday', () => {
      vi.setSystemTime(new Date('2026-12-25T12:00:00'))
      const calendar = new MultiYearCalendar()

      expect(calendar.holidaysLeftThisYear()).toBe(1)
    })

    test('should return 0 when no holidays are left', () => {
      vi.setSystemTime(new Date('2026-12-26T12:00:00'))
      const calendar = new MultiYearCalendar()

      expect(calendar.holidaysLeftThisYear()).toBe(0)
    })

    test('should use the current year whatever year it is', () => {
      vi.setSystemTime(new Date('2027-12-24T12:00:00'))
      const calendar = new MultiYearCalendar()

      expect(calendar.holidaysLeftThisYear()).toBe(2)
    })
  })

  describe('addWorkdays', () => {
    test('should skip the weekend', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.addWorkdays('2026-10-30', 1)).toBe('2026-11-02')
    })

    test('should count a full week of workdays', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.addWorkdays('2026-10-30', 5)).toBe('2026-11-06')
    })

    test('should not count the start date', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.addWorkdays('2026-10-26', 1)).toBe('2026-10-27')
    })

    test('should start counting the day after when the start date is a weekend', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.addWorkdays('2026-10-31', 1)).toBe('2026-11-02')
    })

    test('should skip holidays', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.addWorkdays('2026-12-23', 3)).toBe('2026-12-29')
    })

    test('should skip Easter holidays', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.addWorkdays('2026-04-01', 2)).toBe('2026-04-07')
    })

    test('should skip a holiday in the middle of the week', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.addWorkdays('2026-05-13', 1)).toBe('2026-05-15')
    })

    test('should continue into the next year', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.addWorkdays('2026-12-30', 3)).toBe('2027-01-05')
    })

    test('should handle a count that spans almost a full year', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.addWorkdays('2026-12-31', 254)).toBe('2027-12-29')
    })

    test('should throw error when adding 0 workdays', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.addWorkdays('2026-10-25', 0)).toThrow('positive integer')
    })

    test('should throw error when giving an invalid date', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.addWorkdays('2026-13-25', 1)).toThrow('Invalid date')
    })

    test('should throw error when the result is after 2199', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.addWorkdays('2199-12-31', 1)).toThrow('years from 1900 to 2199')
    })

    test('should throw error when the number of workdays is negative', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.addWorkdays('2026-10-30', -1)).toThrow('positive integer')
    })

    test('should throw error when the number of workdays is not an integer', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.addWorkdays('2026-10-30', 1.5)).toThrow('positive integer')
    })
  })

  /**
   * Tests for error messages. Written by Claude Opus 5.5.
   */
  describe('invalid dates', () => {
  const calendar = new MultiYearCalendar()

  test('throws for February 30', () => {
    expect(() => calendar.isHoliday('2026-02-30')).toThrow('Invalid date')
  })

  test('throws for February 29 in a non-leap year', () => {
    expect(() => calendar.isHoliday('2026-02-29')).toThrow('Invalid date')
  })

  test('throws for April 31', () => {
    expect(() => calendar.isHoliday('2026-04-31')).toThrow('Invalid date')
  })

  test('accepts February 29 in a leap year', () => {
    expect(calendar.isWorkday('2028-02-29')).toBe(true)
  })

  test('throws for workdays as a string', () => {
    expect(() => calendar.addWorkdays('2026-11-04', '5')).toThrow()
  })
})
})
