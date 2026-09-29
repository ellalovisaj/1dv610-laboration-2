/**
 * Test app for HolidayCalendar module.
 */

import { HolidayCalendar } from "../src/HolidayCalendar.js"

const calendar = new HolidayCalendar(2026)

// ***********************************
// TESTS
// ***********************************

// Check if date is a holiday
const xmasEve = '2026-12-24'
const xmasDay = '2026-12-25'

console.log(`Is ${xmasEve} a Swedish public holiday?`)
console.log(`${calendar.isHoliday(xmasEve)}`)
console.log()

console.log(`Is ${xmasDay} a Swedish public holiday?`)
console.log(`${calendar.isHoliday(xmasDay)}`)
console.log()

// Find next holiday from
const dateInput = '2026-09-30'
console.log(`The next holiday from ${dateInput} falls on ${calendar.nextHolidayFrom(dateInput)}.`)
console.log()

// Check if it is a workday
const workday = '2026-09-30'
console.log(`Is ${workday} a regular workday?`)
console.log(calendar.isWorkday(workday))
console.log()

const weekend = '2026-10-03'
console.log(`Is ${weekend} a regular workday?`)
console.log(calendar.isWorkday(weekend))
console.log()

// Find number of working days are left from today until date
const dateInput2 = '2026-10-05'
console.log(`There are ${calendar.workdaysUntil(dateInput2)} workday(s) left until ${dateInput2}.`)
console.log()

// Find number of working days there are between the dates
console.log(`There are ${calendar.workdaysBetween(dateInput, xmasDay)} workday(s) between ${dateInput} and ${xmasDay}.`)
console.log()

// Find number of holidays left this year
console.log(`There are ${calendar.holidaysLeft()} holiday(s) left this year.`)

