Time
=========

A general component that takes a `Date` object as input and outputs the time only. Formatting can change according to locale of user. By default displays only `HH:MM`, but can be extended with certain properties.

##### Time Zone Warning
By default, a date that is formed by the ISO syntax (e.g. `2016-05-31T10:43:00`) will have its time adjusted to match the device's time zone when evaluated. For example, when using a device in a location with a GMT+1 timezone, that object would give an output of `12:01`. To keep the time fixed, set the time zone to UTC by using the `isUTCTimeZone` prop.

Example
-
```
<Time isUTCTimeZone
      showSeconds
      value={new Date('2016-05-31T10:43:00')}/>

// 10:43:00 (if EN-GB)
// 10:43:00 AM (if EN-US)
```

Properties
---
| Property | Type | Default | Effect |
| -------- | --- | --- | --- |
| is12HourFormat | Boolean | ? | If `true`, time will be displayed using a 12-hour clock and AM/PM. If `false`, 24-hour time is used and no AM/PM shown. The default value _differs between locales_, e.g. United Kingdom is false by default but United States is true by default. Additionally, the style of the AM/PM (e.g. AM or am) can also differ between locales.
| isUTCTimeZone | Boolean | false | If `true`, the time passed will have its time zone set to the neutral UTC and the output exactly as is written. Otherwise, the time zone will adapt to the user's location and change the time accordingly.
| showSeconds | Boolean | false | If true, the seconds of the timestamp are also shown e.g. `10:43:00`. If false, only hours and minutes are shown e.g. `10:43`.
| value | Date | N/A | The value of time. ISO formatted Date suggested, though other formats can be used.
