/**
 * Represents the Swedish holidays in a specific year.
 */

import { DateHelpers } from './dateHelpers.js'

const helpers = new DateHelpers()

// All fixed holidays, the same date every year
const fixedHolidays = [
  { name: 'New Years Day', month: 1, day: 1 },
  { name: 'Epiphany', month: 1, day: 6 },
  { name: 'First of May', month: 5, day: 1 },
  { name: 'National Day of Sweden', month: 6, day: 6 },
  { name: 'Christmas Day', month: 12, day: 25 },
  { name: 'Boxing Day', month: 12, day: 26 },
]

/**
 * Gets the date of Midsummer Day. It occurs the day after
 * Midsummer Eve, which falls on the first Friday between the 19th
 * and the 25th of June.
 *
 * @param {number} year - The year.
 * @returns {object} The date of Midsummer Day.
 */
function getMidsummerDayDate(year) {
  const startDate = new Date(`${year}-06-19`)
  const endDate = new Date(`${year}-06-25`)
  const midsummerEve = helpers.findFirstDateOfWeekdayBetween(startDate, endDate, 5)

  const midsummerDay = helpers.addDays(midsummerEve, 1)

  return midsummerDay
}

/**
 * Gets the date of All Saint's Day, which falls on the Saturday
 * between 31st of October and 6th of November.
 *
 * @param {number} year - The year.
 * @returns {object} The date of All Saint's Day.
 */
function getAllSaintsDayDate(year) {
  const startDate = new Date(`${year}-10-31`)
  const endDate = new Date(`${year}-11-07`)
  const allSaintsDay = helpers.findFirstDateOfWeekdayBetween(startDate, endDate, 6)

  return allSaintsDay
}
