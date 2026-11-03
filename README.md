# Holiday Calendar
A small JavaScript module for working with Swedish public holidays. It lets you check if a date is a holiday or a workday, find the next holiday, and count workdays in a period, also across several years

## Features
* Checks whether a date is a holiday or not.
* Checks when next holiday occurs from a specific date.
* Checks if a date is a workday or not (neither a holiday nor a weekend).
* Counts how many workdays there are left from today to a given date.
* Counts how many workdays there are in a period, with or without the start date.
* Counts how many holidays there are left this year, counted from today's date.  

## Limitations
- It does not support any calendar other than the Swedish public holiday calendar.
- It only supports years between 1900 and 2199. Dates outside 1900–2199 throw an error, since the underlying Easter calculation is only verified within that range.
- Christmas Eve, Midsummer Eve and New Year's Eve are not public holidays in Sweden, so they are counted as workdays.
- Easter-based holidays are calculated using a simplified version of the Gauss Easter algorithm, which gives the wrong result in a small number of specific edge-cases.


## Getting Started

### Installation

```bash
npm install github:ellalovisaj/1dv610-laboration-2#v1.2.0
```

The package name changed from `js-cli-template` to `Holiday-Calendar` in v1.1.0. If you used an earlier version, update your import.

---
## Usage
Create one MultiYearCalendar and use it for any date. Write all dates as strings in the format `YYYY-MM-DD`, see examples below.

```js
import { MultiYearCalendar } from 'Holiday-Calendar'

const calendar = new MultiYearCalendar()

calendar.isHoliday('2027-01-06')
// true (Epiphany)

calendar.isWorkday('2026-10-03')
// false (Saturday)

calendar.nextHolidayFrom('2026-12-30')
// '2027-01-01' (New Year's Day)

calendar.workdaysInPeriod('2026-12-21', '2026-12-28')
// 5 (both dates counted, Christmas Day and the weekend excluded)

calendar.workdaysAfterUntil('2026-12-21', '2026-12-28')
// 4 (the start date is not counted)

calendar.workdaysInPeriod('2026-12-21', '2027-01-08')
// 12 (a period across New Year)

/*
 * The following methods depend on today's date. Results shown for 2026-11-03:
 */
calendar.workdaysAfterTodayUntil('2026-12-24')
// 37

calendar.holidaysLeftThisYear()
// 2 (Christmas Day and Boxing Day)
```


## Public methods
The public methods available in MultiYearCalendar.js. All dates are **strings** in the format `YYYY-MM-DD`. All methods throw an error if a date is invalid or outside the supported years (1900-2199).

### isHoliday(date)
Checks if given date is a Swedish **holiday or not**. Returns true or false.

### isWorkday(date)
Checks if the given date is a **workday or not**. A workday does not fall on a weekend or a holiday. Returns true or false.

### nextHolidayFrom(date)
Returns the **next holiday date from the given date**. If the given date is a holiday, the next holiday date will be returned. If the given date is after the last holiday of the year, the date of the first holiday of next year will be returned.

### workdaysAfterUntil(startDate, endDate)
Returns the **number of workdays in the given period**, including the given end date if it is a workday. Does not count the start date, weekends or holidays.

### workdaysInPeriod(startDate, endDate)
Returns the number of workdays in the given period, including the given dates if they are workdays. Does not count weekends or holidays.

## Public methods that rely on today's date

### workdaysAfterTodayUntil(date)
Returns the number of workdays **after today up to the given date**. Does not include today's date. Does not include weekends or holidays.

### holidaysLeftThisYear()
Returns the number of holidays left this year from today's date, not counting today.


## 🚫 Deprecated

### HolidayCalendar

HolidayCalendar only handles dates within a single year, given when the calendar is created. It still works, but might be removed in a future major version. Use MultiYearCalendar instead. It has the same methods and works for dates in any supported year.

```js
// Before
import { HolidayCalendar } from 'Holiday-Calendar'
const calendar = new HolidayCalendar(2026)

// After
import { MultiYearCalendar } from 'Holiday-Calendar'
const calendar = new MultiYearCalendar()
```

| Previously in HolidayCalendar | Use in MultiYearCalendar |
| --- | --- |
| isHoliday(date) | isHoliday(date) |
| isWorkday(date) | isWorkday(date) |
| nextHolidayFrom(date) | nextHolidayFrom(date) |
| workdaysInPeriod(start, end) | workdaysInPeriod(start, end) |
| workdaysAfterUntil(start, end) | workdaysAfterUntil(start, end) |
| workdaysAfterTodayUntil(date) | workdaysAfterTodayUntil(date) |
| holidaysLeftThisYear() | holidaysLeftThisYear() |
| workdaysBetween(start, end) | workdaysInPeriod(start, end) or workdaysAfterUntil(start, end), see below |
| workdaysFromTodayUntil(date) | workdaysAfterTodayUntil(date), see below |



### workdaysFromTodayUntil(date)
Counts the number of workdays between today's date and the given date. This method is deprecated because it counts the start date but not the end date.

It is recommended to use `workdaysAfterTodayUntil()` instead.

### workdaysBetween(startDate, endDate)
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
The module is tested with Vitest. There are automatic tests for all public methods in `test/HolidayCalendar.test.js` and `test/MultiYearCalendar.test.js`. Read more in `TEST_REPORT.md`

---

## Project Structure

```text
├── src/
│   ├── index.js                  # Entry point
│   ├── MultiYearCalendar.js      # Main class
│   ├── DateHelpers.js            # Class that holds helper functions
│   ├── HolidayCalendar.js        # Calendar for a single year
│   ├── MovingHolidays.js         # Class that is responsible for all moving holidays
│   └── EasterCalculator.js       # Class that is responsible for all Easter-based holidays
├── test/  
│   ├── MultiYearCalendar.test.js # Vitest tests for MultiYearCalendar       
│   └── HolidayCalendar.test.js   # Vitest tests for HolidayCalendar
└── package.json                  # Project configuration, scripts, and dependencies
```

---

## Changelog

#### v1.2.0
- Added `MultiYearCalendar`, which works for dates in any year between 1900 and 2199, also across multiple years
- Deprecated `HolidayCalendar`. It still works, but might be removed in a future major version

#### v1.1.0
- Added `workdaysInPeriod()`, `workdaysAfterUntil()` and `workdaysAfterTodayUntil()`
- Deprecated `workdaysBetween()` and `workdaysFromTodayUntil()`
- Package name changed from `js-cli-template` to `Holiday-Calendar`

Development:
- Removed the manual test app. The module is tested with Vitest (`npm test`)



---

## License

This project is released into the public domain under the **Unlicense**. You are free to copy, modify, publish, and distribute this code in any way you see fit without any restrictions.
