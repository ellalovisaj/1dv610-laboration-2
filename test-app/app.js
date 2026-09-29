/**
 * Test app for HolidayCalendar module.
 */

import { HolidayCalendar } from '../src/HolidayCalendar.js'

const calendar = new HolidayCalendar(2026)

// ***********************************
// TESTS
// ***********************************

// Check if date is a holiday
const xmasEve = '2026-12-24'
const xmasDay = '2026-12-25'

isHolidayTest()

function isHolidayTest() {
  console.log('***** isHoliday() *****')

  writeOutTest(
    `Is ${xmasEve} a Swedish public holiday?`,
    'false',
    calendar.isHoliday(xmasEve)
  )

  writeOutTest(
    `Is ${xmasDay} a Swedish public holiday?`,
    'true',
    calendar.isHoliday(xmasDay)
  )
}


// Find next holiday from
const dateInput = '2026-09-30'
console.log(`The next holiday from ${dateInput} falls on:
  Expected:\t 2026-10-31
  Got:\t\t ${calendar.nextHolidayFrom(dateInput)}\n`)

const boxingDay = '2026-12-26'
console.log(`The next holiday from ${boxingDay} falls on:
  Expected:\t 2027-01-01
  Got:\t\t ${calendar.nextHolidayFrom(boxingDay)}\n`)

// Check if it is a workday
const workday = '2026-09-30'
console.log(`Is ${workday} a regular workday?
  Expected:\t true
  Got:\t\t ${calendar.isWorkday(workday)}\n`)

const weekend = '2026-10-03'
console.log(`Is ${weekend} a regular workday?
  Expected:\t false
  Got:\t\t ${calendar.isWorkday(weekend)}\n`)

// Find number of working days are left from today until date
const dateInput2 = '2026-10-31'
console.log(`Workday(s) left until ${dateInput2}:
  Expected:\t 24 (when tested on 2026-09-29)
  Got:\t\t ${calendar.workdaysUntil(dateInput2)}\n`)

// Find number of working days there are between the dates
console.log(`Workday(s) between until ${dateInput} and ${xmasDay}:
  Expected:\t 62
  Got:\t\t ${calendar.workdaysBetween(dateInput, xmasDay)}\n`)

// Find number of holidays left this year
console.log(`Holiday(s) left this year:
  Expected:\t 3 (when tested on 2026-09-29)
  Got:\t\t ${calendar.holidaysLeft()}\n`)

/**
 *
 * @param description
 * @param expected
 * @param actual
 */
function writeOutTest(description, expected, actual) {
  console.log(`${description}`)
  console.log(`Expected:\t ${expected}`)
  console.log(`Actual:\t\t ${actual}\n`)
}
