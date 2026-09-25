/**
 * Represents the Swedish holidays in a specific year.
 */

// All fixed holidays, the same date every year
export const fixedHolidays = [
  { name: 'New Years Day', month: 1, day: 1 },
  { name: 'Epiphany', month: 1, day: 6 },
  { name: 'First of May', month: 5, day: 1 },
  { name: 'National Day of Sweden', month: 6, day: 6 },
  { name: 'Christmas Day', month: 12, day: 25 },
  { name: 'Boxing Day', month: 12, day: 26 },
]

// Easter Holidays:

// Good Friday
// Easter--

// Easter
// Calculated based on Gauss Easter Algorithm

// Day after Easter
// Easter++

// Ascension Day
// 39 days after Easter

// Pentecost
// 49 days after Easter

// Midsummer
// Day after Friday that falls between 19 and 25 of June
/**
 * Gets the date of Midsummer Day. It occurs the day after 
 * Midsummer Eve, which falls on the first Friday between the 19th
 * and the 25th of June.
 * 
 * @param {number} year - The year to find the date in.
 * @returns {object} The date of Midsummer Day.
 */
function getMidsummerDayDate(year) {
  let day = 19
  let weekday
  let date

  // Loop until date is a Friday (5)
  while (weekday !== 5){
    date = new Date(`${year}-06-${day}`)
    weekday = getWeekday(date)
    day++
  } 
  
  // TODO: Better solution?

  // New date object to account for the extra day
  return new Date(`${year}-06-${day}`)
}

// All Saint's Day
// First Saturday between October 31 and November 6
/**
 *
 * @param year
 */
function getAllSaintsDayDate(year) {
  // calculate here
  // return date
}

/**
 *
 * @param date
 */
function getWeekday(date) {
  const weekday = new Date(date).getDay()
  return weekday
}
