import { describe, test, expect } from 'vitest'
import { HolidayCalendar } from '../src/HolidayCalendar.js'

describe('isHoliday', () => {
  test('Should return true for Christmas Day', () => {
    const calendar = new HolidayCalendar(2026)

    expect(calendar.isHoliday('2026-12-25')).toBe(true)
  })

  test('Should return false for Christmas Eve', () => {
    const calendar = new HolidayCalendar(2026)

    expect(calendar.isHoliday('2026-12-24')).toBe(false)
  })

  test('Should throw error when giving an invalid date', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isHoliday('2026-13-25')).toThrow()
  })

  test('Should throw error when giving an invalid year', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isHoliday('2024-10-22')).toThrow()
  })
})

describe('nextHolidayFrom', () => {
  test('Should find the date of the next holiday', () => {
    const calendar = new HolidayCalendar(2026)
    const workday = '2026-09-30'

    expect(calendar.nextHolidayFrom(workday)).toBe('2026-10-31')
  })

  test('Should be able to find the first holiday in the next year when it is next', () => {
    const calendar = new HolidayCalendar(2026)
    const date = '2026-12-30'

    expect(calendar.nextHolidayFrom(date)).toBe('2027-01-01')
  })

  test('Should not return the given date if it is a holiday, but instead the next holiday', () => {
    const calendar = new HolidayCalendar(2026)
    const holiday = '2026-12-25'

    expect(calendar.nextHolidayFrom(holiday)).toBe('2026-12-26')
  })

  test('Should throw error when giving an invalid date', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isHoliday('2026-13-25')).toThrow()
  })

  test('Should throw error when giving an invalid year', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isHoliday('2024-10-22')).toThrow()
  })
})

describe('isWorkday', () => {
  test('Should return true when given a workday date', () => {
    const calendar = new HolidayCalendar(2026)
    const workday = '2026-09-30'

    expect(calendar.isWorkday(workday)).toBe(true)
  })

  test('Should return false when given a weekend date', () => {
    const calendar = new HolidayCalendar(2026)
    const weekend = '2026-10-10'

    expect(calendar.isWorkday(weekend)).toBe(false)
  })

  test('Should return false when given a holiday date', () => {
    const calendar = new HolidayCalendar(2026)
    const holiday = '2026-12-25'

    expect(calendar.isWorkday(holiday)).toBe(false)
  })

  test('Should throw error when giving an invalid date', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isHoliday('2026-13-25')).toThrow()
  })

  test('Should throw error when giving an invalid year', () => {
    const calendar = new HolidayCalendar(2026)

    expect(() => calendar.isHoliday('2024-10-22')).toThrow()
  })
})
