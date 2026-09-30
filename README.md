# Holiday Calendar
A small JavaScript module for working with Swedish public holidays. It calculates all holiday dates in a given year and lets you check if a specific date is a holiday, or when the next holiday occurs etc.

## Features
* Checks whether a date is a holiday or not.
* Checks when next holiday occurs from a specific date.
* Checks if a date is a workday or not (neither a holiday nor a weekend).
* Counts how many workdays there are left from today to a given date.
* Counts how many workdays there are between two dates.
* Counts how many holidays there are left this year, counted from today's date.  

## Limitations
- It does not support any calendar other than the Swedish public holiday calendar.
- It only supports years between 1900 and 2199. Creating a calendar for a year outside that range throws an error, since the underlying Easter calculation is only verified within that range.
- Easter-based holidays are calculated using a simplified version of the Gauss Easter algorithm, which gives the wrong result in a small number of specific edge-cases.
- Methods that take a date only accept dates within the calendar's year. For example, a calendar created for 2026 will throw an error if you ask about a date in 2027. Create a separate instance per year if you need to check multiple years.


## Getting Started

### Prerequisites

Ensure you have **Node.js** (version 24.12.0 or later) and **Git** installed on your machine.

### Installation & Project Setup
To install dependencies, run:
   ```bash
   npm install
   ```

---

## Available Scripts

To run test application:

```bash
npm start
```

### Code Linting

To find linting issues:

```bash
npm run lint
```

Automatically fix fixable linting issues:

```bash
npm run lint:fix
```
---

## Usage
Create a new instance of the calendar for the year you're working with. When calling functions, write dates as strings in the format 'YYYY-MM-DD', see examples below.

```js
import { HolidayCalendar } from './src/HolidayCalendar.js'

const calendar = new HolidayCalendar(2026)

calendar.isHoliday('2026-12-25')
// true

calendar.isWorkday('2026-10-03')
// false (Saturday)

calendar.nextHolidayFrom('2026-09-30')
// 2026-10-31 (All Saints Day)

calendar.workdaysBetween('2026-09-30', '2026-12-25')
// 62
```

---

## Project Structure

```text
├── src/
│   ├── DateHelpers.js       # Class that holds helper functions
│   ├── HolidayCalendar.js   # Main module
│   ├── MovingHolidays.js    # Class that is responsible for all moving holidays
│   └── EasterCalculator.js  # Class that is responsible for all Easter-based holidays
├── test-app/          
│   └── app.js       # Test application
└── package.json     # Project configuration, scripts, and dependencies
```

---

## License

This project is released into the public domain under the **Unlicense**. You are free to copy, modify, publish, and distribute this code in any way you see fit without any restrictions.
