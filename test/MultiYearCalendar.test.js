import { describe, test, expect } from 'vitest'
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

      expect(() => calendar.isHoliday('2026-13-25')).toThrow()
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

      expect(() => calendar.nextHolidayFrom('2026-13-25')).toThrow()
    })

    test('should be able to find next holiday from dates in different years', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.nextHolidayFrom('2026-12-29')).toBe('2027-01-01')
      expect(calendar.nextHolidayFrom('2028-06-05')).toBe('2028-06-06')
      expect(calendar.nextHolidayFrom('2030-01-01')).toBe('2030-01-06')
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

      expect(() => calendar.isWorkday('2026-13-25')).toThrow()
    })

    test('should be able to return true for workday dates in different years', () => {
      const calendar = new MultiYearCalendar()

      expect(calendar.isWorkday('2026-06-12')).toBe(true)
      expect(calendar.isWorkday('2028-08-15')).toBe(true)
      expect(calendar.isWorkday('2030-05-03')).toBe(true)
    })
  })

  describe('workdaysBetween', () => {
    test('should not count weekends', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-10-09'
      const endDate = '2026-10-11'

      expect(calendar.workdaysBetween(startDate, endDate)).toBe(1)
    })

    test('should not count holidays', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-12-23'
      const endDate = '2026-12-26'

      expect(calendar.workdaysBetween(startDate, endDate)).toBe(2)
    })

    test('should account for leap years', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2028-02-28'
      const endDate = '2028-03-01'

      expect(calendar.workdaysBetween(startDate, endDate)).toBe(2)
    })

    test('should count workdays in a period that carry over into a new year', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2026-11-02'
      const endDate = '2027-01-15'

      expect(calendar.workdaysBetween(startDate, endDate)).toBe(51)
    })

    test('should count workdays in a period that spans over multiple years', () => {
      const calendar = new MultiYearCalendar()
      const startDate = '2025-09-02'
      const endDate = '2030-05-04'

      expect(calendar.workdaysBetween(startDate, endDate)).toBe(1185)
    })

    test('should throw error when giving an invalid date', () => {
      const calendar = new MultiYearCalendar()

      expect(() => calendar.workdaysBetween('2026-13-25')).toThrow()
    })
  })
})
