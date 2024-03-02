# chakra-dayzed-datepicker (modified)

The code in this folder was originally downloaded from [aboveyunhai/chakra-dayzed-datepicker](https://github.com/aboveyunhai/chakra-dayzed-datepicker) at version `0.2.9` and then modified.

## Changes

### DatepickerProps['getDateDisabled']

A new optional prop allows you to supply custom logic to determine whether dates are disabled or not.

```ts
getDateDisabled?: (date: Date) => boolean
```
