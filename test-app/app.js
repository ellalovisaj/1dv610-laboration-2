/**
 * Test app for HolidayCalendar module.
 */

import { HolidayCalendar } from '../src/HolidayCalendar.js'

const calendar = new HolidayCalendar(2026)

// Dates used in the tests
const workday = '2026-09-30'
const weekend = '2026-10-03'
const octoberDate = '2026-10-31'
const xmasEve = '2026-12-24'
const xmasDay = '2026-12-25'
const boxingDay = '2026-12-26'

// Call test functions
isHolidayTest()
nextHolidayFromTest()
isWorkdayTest()
workdaysUntilTest()
workdaysBetweenTest()
holidaysLeftTest()

/**
 * Tests the isHoliday() method.
 */
function isHolidayTest() {
  console.log('***** isHoliday() *****')

  writeOutTest(`Is ${xmasEve} a Swedish public holiday?`, 'false', calendar.isHoliday(xmasEve))

  writeOutTest(`Is ${xmasDay} a Swedish public holiday?`, 'true', calendar.isHoliday(xmasDay))
}

/**
 * Tests the nextHolidayFrom() method.
 */
function nextHolidayFromTest() {
  console.log('***** nextHolidayFrom() *****')

  writeOutTest(`The next holiday from ${workday} falls on:`, '2026-10-31', calendar.nextHolidayFrom(workday))

  writeOutTest(`The next holiday from ${boxingDay} falls on:`, '2027-01-01', calendar.nextHolidayFrom(boxingDay))
}

/**
 * Tests the isWorkday() method.
 */
function isWorkdayTest() {
  console.log('***** isWorkday() *****')

  writeOutTest(`Is ${workday} a regular workday?`, 'true', calendar.isWorkday(workday))

  writeOutTest(`Is ${weekend} a regular workday?`, 'false', calendar.isWorkday(weekend))
}

/**
 * Tests the workdaysUntil() method.
 */
function workdaysUntilTest() {
  console.log('***** workdaysUntil() *****')

  writeOutTest(
    `Workday(s) left until ${octoberDate}:`,
    '24 (when tested on 2026-09-29)',
    calendar.workdaysUntil(octoberDate)
  )
}

/**
 * Tests the workdaysBetween() method.
 */
function workdaysBetweenTest() {
  console.log('***** workdaysBetween() *****')

  writeOutTest(`Workday(s) between until ${workday} and ${xmasDay}:`, '62', calendar.workdaysBetween(workday, xmasDay))
}

/**
 * Tests the holidaysLeft() method.
 */
function holidaysLeftTest() {
  console.log('***** holidaysLeft() *****')

  writeOutTest(`Holiday(s) left this year:`, '3 (when tested on 2026-09-29)', calendar.holidaysLeft())
}

/**
 * Writes out a test case, containing description, expected result
 * and actual result.
 *
 * @param {string} description - Test description.
 * @param {string} expected - The expected result.
 * @param {string|number|boolean} actual - The actual result.
 */
function writeOutTest(description, expected, actual) {
  console.log(`${description}`)
  console.log(`Expected:\t ${expected}`)
  console.log(`Actual:\t\t ${actual}\n`)
}
