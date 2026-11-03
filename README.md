# Holiday Calendar
A small JavaScript module for working with Swedish public holidays. It calculates all holiday dates in a given year and lets you check if a specific date is a holiday, or when the next holiday occurs etc.

## Features
* Checks whether a date is a holiday or not.
* Checks when next holiday occurs from a specific date.
* Checks if a date is a workday or not (neither a holiday nor a weekend).
* Counts how many workdays there are left from today to a given date.
* Counts how many workdays there are in a period, with or without the start date.
* Counts how many holidays there are left this year, counted from today's date.  

## Limitations
- It does not support any calendar other than the Swedish public holiday calendar.
- It only supports years between 1900 and 2199. Creating a calendar for a year outside that range throws an error, since the underlying Easter calculation is only verified within that range.
- Easter-based holidays are calculated using a simplified version of the Gauss Easter algorithm, which gives the wrong result in a small number of specific edge-cases.
- Methods that take a date only accept dates within the calendar's year. For example, a calendar created for 2026 will throw an error if you ask about a date in 2027. Create a separate instance per year if you need to check multiple years.


## Getting Started

### Installation

```bash
npm install github:ellalovisaj/1dv610-laboration-2#v1.1.0
```

The package name changed from `js-cli-template` to `Holiday-Calendar` in v1.1.0. If you used an earlier version, update your import.

---

## Public methods
The public methods available in HolidayCalendar.js. All arguments should be **strings** in the format `YYYY-MM-DD`. All methods throw an error if a date is invalid or outside the calendar’s year.

### isHoliday(dateString)
Checks if given date is a Swedish **holiday or not**. Returns true or false.

### isWorkday(dateString)
Checks if the given date is a **workday or not**. A workday does not fall on a weekend or a holiday. Returns true or false.

### nextHolidayFrom(dateString)
Returns the **next holiday date from the given date**. If the given date is a holiday, the next holiday date will be returned. If the given date is after the last holiday of the year, the date of the first holiday of next year will be returned.

### workdaysAfterUntil(startDateString, endDateString)
Returns the **number of workdays in the given period**, including the given end date if it is a workday. Does not count the start date, weekends or holidays.

### workdaysInPeriod(startDateString, endDateString)
Returns the number of workdays in the given period, including the given dates if they are workdays. Does not count weekends or holidays.

## Public methods that rely on today's date

### workdaysAfterTodayUntil(dateString)
Returns the number of workdays **between today's date and the given date**. Including the given end date but not today's date. Does not include weekends or holidays.

### holidaysLeftThisYear()
Returns the number of holidays left this year from today's date.


## Usage
Create a new instance of the calendar for the year you're working with. When calling functions, write dates as strings in the format `YYYY-MM-DD`, see examples below.

```js
import { HolidayCalendar } from 'Holiday-Calendar'

const calendar = new HolidayCalendar(2026)

calendar.isHoliday('2026-12-25')
// true

calendar.isWorkday('2026-10-03')
// false (Saturday)

calendar.nextHolidayFrom('2026-09-30')
// '2026-10-31' (All Saints' Day)

calendar.workdaysInPeriod('2026-12-21', '2026-12-28')
// 5 (both dates counted, Christmas Day and the weekend excluded)

calendar.workdaysAfterUntil('2026-12-21', '2026-12-28')
// 4 (the start date is not counted)

/*
 * The following methods depend on today's date. Results shown for 2026-11-03:
 */
calendar.workdaysAfterTodayUntil('2026-12-24')
// 37

calendar.holidaysLeftThisYear()
// 2 (Christmas Day and Boxing Day)
```

## 🚫 Deprecated

### workdaysFromTodayUntil(dateString)
Counts the number of workdays between today's date and the given date. This method is deprecated because it counts the start date but not the end date.

It is recommended to use `workdaysAfterTodayUntil()` instead.

### workdaysBetween(startDateString, endDateString)
Counts the number of workdays between two given dates. The reason it is deprecated is that it counts the start date but not the end date.

It is recommended to use `workdaysInPeriod()` (that counts both start and end date) or `workdaysAfterUntil()` (that counts the end date but not the start date) instead.

## Development
### Prerequisites

Ensure you have **Node.js** (version 24.12.0 or later) and **Git** installed on your machine.

To install dependencies, run:
   ```bash
   npm install
   ```

### Available Scripts

To run tests:

```bash
npm test
```

To find linting issues:

```bash
npm run lint
```

Automatically fix fixable linting issues:

```bash
npm run lint:fix
```
---
## Tests
The module is tested with Vitest. There are automatic tests for all public methods in `test/HolidayCalendar.test.js`. Read more in `TEST_REPORT.md`

---

## Project Structure

```text
├── src/
│   ├── DateHelpers.js            # Class that holds helper functions
│   ├── HolidayCalendar.js        # Main module
│   ├── MovingHolidays.js         # Class that is responsible for all moving holidays
│   └── EasterCalculator.js       # Class that is responsible for all Easter-based holidays
├── test/          
│   └── HolidayCalendar.test.js   # Vitest tests
└── package.json                  # Project configuration, scripts, and dependencies
```

---

## Changelog

#### v1.1.0
- Added `workdaysInPeriod()`, `workdaysAfterUntil()` and `workdaysAfterTodayUntil()`
- Deprecated `workdaysBetween()` and `workdaysFromTodayUntil()`
- Package name changed from `js-cli-template` to `Holiday-Calendar`

Development:
- Removed the manual test app. The module is tested with Vitest (`npm test`)

---

## License

This project is released into the public domain under the **Unlicense**. You are free to copy, modify, publish, and distribute this code in any way you see fit without any restrictions.
