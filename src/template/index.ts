import run from 'aocrunner'

const parseInput = (rawInput: string): string => rawInput

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  const lines = input.split('\n')
  console.log('lines', lines)

  const sum = lines.reduce((total, line): number => {
    return total
  }, 0)

  return sum
}

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  const lines = input.split('\n')
  // console.log('lines', lines)

  const sum = lines.reduce((total, line): number => {
    return total
  }, 0)

  return sum
}

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
