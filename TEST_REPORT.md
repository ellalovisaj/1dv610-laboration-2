# Test Report
## Summary

The module is tested manually with a test-app (`test-app/app.js`), that calls every public method with pre-defined data. It tests both "happy paths" and exceptions. The test cases can be reproduced by running `npm start`. I chose this method because I thought it was the easiest way to get started, to be able to test it while working with the module, and then I stuck with it.

## Test Results

**Your test results

| What was tested                             | How it was tested                                                             | Result                                                                        |
| ------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| new HolidayCalendar(2026)                   | Manual test: called the method and compared actual output to expected output. | ✅ Passed                                                                      |
| new HolidayCalendar(2200)                   | Manual test: called the method and compared actual output to expected output. | ✅ Passed (Should throw error)                                                 |
| isHoliday('2026-12-24')                     | Manual test: called the method and compared actual output to expected output. | ✅ Passed                                                                      |
| isHoliday('2026-12-25')                     | Manual test: called the method and compared actual output to expected output. | ✅ Passed                                                                      |
| isHoliday('2027-12-25')                     | Manual test: called the method and compared actual output to expected output. | ✅ Showed false when current year was 2026. Will now throw error instead.      |
| nextHolidayFrom('2026-09-30')               | Manual test: called the method and compared actual output to expected output. | ✅ Passed                                                                      |
| nextHolidayFrom('2026-12-26')               | Manual test: called the method and compared actual output to expected output. | ✅ Passed                                                                      |
| isWorkday('2026-09-30')                     | Manual test: called the method and compared actual output to expected output. | ✅ Passed                                                                      |
| isWorkday('2026-10-03')                     | Manual test: called the method and compared actual output to expected output. | ✅ Passed                                                                      |
| workdaysUntil('2026-10-31')                 | Manual test: called the method and compared actual output to expected output. | ✅ Passed (Depends on when the testing occurs. Passed when testing 2026-09-29) |
| workdaysBetween('2026-09-30', '2026-12-25') | Manual test: called the method and compared actual output to expected output. | ✅ Passed                                                                      |
| holidaysLeft()                              | Manual test: called the method and compared actual output to expected output. | ✅ Passed (Depends on when the testing occurs. Passed when testing 2026-09-29) |

