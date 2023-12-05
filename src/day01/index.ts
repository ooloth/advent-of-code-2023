import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  // Convert the text to an array of strings (where each line becomes one item)
  const array = input.split('\n')

  return sumOfCalibrationValues(array)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  // Convert the text to an array of strings (where each line becomes one item)
  const array = input.split('\n')

  return sumOfCalibrationValues(array)
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: 'two1nine', expected: 29 },
      { input: 'eightwothree', expected: 83 },
      { input: 'abcone2threexyz', expected: 13 },
      { input: 'xtwone3four', expected: 24 },
      { input: '4nineeightseven2', expected: 42 },
      { input: 'zoneight234', expected: 14 },
      { input: '7pqrstsixteen', expected: 76 },
      { input: 'oneight', expected: 18 },
      { input: 'twone', expected: 21 },
      { input: 'threeight', expected: 38 },
      { input: 'fiveight', expected: 58 },
      { input: 'sevenine', expected: 79 },
      { input: 'eighthree', expected: 83 },
      { input: 'nineight', expected: 98 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})

const sumOfCalibrationValues = (array: string[]): number =>
  array.reduce((total, item) => {
    // Find all digits in the string
    const digits = getNumberAndTextDigits(item)
    // console.log('digits', digits);

    // Find the first digit (if any)
    const firstDigit = digits.length ? digits[0] : 0
    // console.log('firstDigit', firstDigit)

    // Find the last digit (if any)
    const lastDigit = firstDigit ? digits[digits.length - 1] : ''
    // console.log('lastDigit', lastDigit)

    // Combine two digits into a single two-digit calibration number
    const twoDigitNumber = Number(firstDigit + lastDigit)
    console.log('twoDigitNumber', twoDigitNumber)

    // Update the total
    return total + twoDigitNumber
  }, 0)

function getNumberAndTextDigits(str: string): string[] {
  console.log('str', str)

  // Find all digits and digits written as text (e.g. "one", "two", "three"...) in a string
  const regex = /(\d|((?=one)|(?=two)|(?=three)|four|(?=five)|six|(?=seven)|(?=eight)|(?=nine)))/g

  // Find all matches
  const matchesAsArray = str.match(regex) || []
  console.log('matchesAsArray', matchesAsArray)

  // Convert text digits to number digits
  const matchesAsStringDigits = matchesAsArray.map((match): string => {
    switch (match) {
      case 'one':
        return '1'
      case 'two':
        return '2'
      case 'three':
        return '3'
      case 'four':
        return '4'
      case 'five':
        return '5'
      case 'six':
        return '6'
      case 'seven':
        return '7'
      case 'eight':
        return '8'
      case 'nine':
        return '9'
      default:
        return match
    }
  })

  // Return an array of all matches
  return matchesAsStringDigits.filter(Boolean)
}
