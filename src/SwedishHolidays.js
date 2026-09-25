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
 * @param {number} year - The year.
 * @returns {object} The date of Midsummer Day.
 */
function getMidsummerDayDate(year) {
  let day = 19
  let weekday
  let date

  // Loop until weekday is a Friday (5)
  while (weekday !== 5){
    date = new Date(`${year}-06-${day}`)
    weekday = getWeekday(date)
    day++
  } 
  
  // TODO: Better solution?

  // New date object to account for the extra day
  return new Date(`${year}-06-${day}`)
}

/**
 * Gets the date of All Saint's Day, which falls on the Saturday
 * between 31st of October and 6th of November.
 * 
 * @param {number} year - The year.
 * @returns {object} The date of All Saint's Day.
 */
function getAllSaintsDayDate(year) { 
  // Set date to October 31 and check which weekday it is
  let date = new Date(`${year}-10-31`)
  let weekday = getWeekday(date)

  // Return date if weekday is Saturday (6).
  if (weekday === 6) {
    return date
  }

  // TODO: Time zone issue, when day is one digit (i.e 6 instead of 06). Fix formatting

  let day = 1

  // Loop until weekday is a Saturday (6)
  while (weekday !== 6){
    date = new Date(`${year}-11-${day}`)
    weekday = getWeekday(date)
    day++
  } 

  return date
}

/**
 * 
 * @param date
 */
function getWeekday(date) {
  const weekday = new Date(date).getDay()
  return weekday
}
