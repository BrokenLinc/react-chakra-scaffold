# Dates & Times

This app has several ways of handling dates and times, indicated by the property name's suffix:

## DateTimeUTC

- Type: `Date`
  - _Note: The date-string coming from (and going to) the API is a UTC string. An axios interceptor handles the conversion._
- Represents a specific moment in time.
- Example: `new Date('Mon Oct 30 2023 12:36:12 GMT-0400 (Eastern Daylight Time)')`
- Formatting helper: N/A
- DataGrid column subtype: N/A
- Compatible BaseInput types: `"date"`, `"dateparts"`, `"daterange'`

## DateTimeOnly

- Type: `String`
- Represents a date and time without zone information.
- Used for things like timestamps, which are relative to a geographical location.
- May or may not include milliseconds
- Examples: `'2023-10-30 12:36:12'`, `'2023-10-30 12:36:12.1548'`
- Formatting helper: `formatDateTimeOnly()`
- DataGrid column subtype: `datetimeonly`
- Compatible BaseInput types: N/A

## DateOnly

- Type: `String`
- Represents a date without a time or zone information.
- Used for things like birthdays or deadlines, which are relative to a geographical location.
- Example: `'2023-10-30'`
- Formatting helper: `formatDateOnly()`
- DataGrid column subtype: `dateonly`
- Compatible BaseInput types: `"dateonly"`, `"dateonlyparts"`

## TimeOnly

- Type: `String`
- Represents a time of day without a date or zone information.
- Used for things like schedules, which are relative to a geographical location.
- May or may not include milliseconds
- Examples: `'12:36:12'`, `'12:36:12.1548'`
- Formatting helper: `formatTimeOnly()`
- DataGrid column subtype: `timeonly`
- Compatible BaseInput types: `"timeonlyparts"`
