/**
 * Test app for Holiday module.
 */

import { Holiday } from '../src/Holiday.js'

const calendar = new Holiday(2026)


const dateInput = '2026-12-25'

const xmas = new Date(dateInput)
console.log(typeof xmas)
console.log(xmas.toISOString().split('T')[0])


// Test: Check if date is a holiday
console.log(calendar.isHoliday('2026-12-25'))

// Find next holiday from today
console.log(calendar.nextHoliday())

// Find number of working days are left from today until date
console.log(calendar.workdaysUntil('2026-12-15'))

// Find number of working days there are between the dates
console.log(calendar.workdaysBetween('2026-12-15', '2026-12-20'))

// Find number of holidays left this year
console.log(calendar.holidaysLeft())
