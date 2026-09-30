/**
 * Test app for HolidayCalendar module.
 */

import { HolidayCalendar } from '../src/HolidayCalendar.js'

const year = 2026
const invalidYear = 2200

const calendar = new HolidayCalendar(year)

// Dates used in the tests
const workday = '2026-09-30'
const weekend = '2026-10-03'
const octoberDate = '2026-10-31'
const xmasEve = '2026-12-24'
const xmasDay = '2026-12-25'
const boxingDay = '2026-12-26'

const invalidYearDate = '2027-12-25'

// Call test functions
constructorTest()
isHolidayTest()
nextHolidayFromTest()
isWorkdayTest()
workdaysUntilTest()
workdaysBetweenTest()
holidaysLeftTest()

/**
 * Tests the HolidayCalendar constructor.
 */
function constructorTest() {
  try {
    new HolidayCalendar(year)
    writeOutTest(`Is ${year} a valid year?`, 'No error thrown', 'No error thrown')
  } catch (error) {
    writeOutTest(`Is ${year} a valid year?`, 'No error thrown', `Error thrown: ${error}`)
  }

  try {
    new HolidayCalendar(invalidYear)
    writeOutErrorTest(`Is ${invalidYear} a valid year?`, null)
  } catch (error) {
    writeOutErrorTest(`Is ${invalidYear} a valid year?`, error)
  }
}

/**
 * Tests the isHoliday() method.
 */
function isHolidayTest() {
  console.log('***** isHoliday() *****')

  writeOutTest(`Is ${xmasEve} a Swedish public holiday in ${year}?`, 'false', calendar.isHoliday(xmasEve))

  writeOutTest(`Is ${xmasDay} a Swedish public holiday in ${year}?`, 'true', calendar.isHoliday(xmasDay))

  try {
    calendar.isHoliday(invalidYearDate)
    writeOutErrorTest(`Is ${invalidYearDate} a Swedish public holiday in ${year}?`, null)
  } catch (error) {
    writeOutErrorTest(`Is ${invalidYearDate} a Swedish public holiday in ${year}?`, error)
  }
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

/**
 * Writes out a test case where the expected result is an error.
 * If there is an error, the error message will be written.
 *
 * @param {string} description - Test description.
 * @param {Error|null} error - The error, and null if there are no errors.
 */
function writeOutErrorTest(description, error) {
  console.log(`${description}`)
  console.log('Expected:\t Error thrown.')

  if (error) {
    console.log(`Actual:\t\t Error thrown: ${error.message}\n`)
  } else {
    console.log('Actual:\t\t No error thrown.\n')
  }
}
