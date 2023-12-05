import run from 'aocrunner'
import { get } from 'http'

const parseInput = (rawInput: string): string => rawInput

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  const lines = input.split('\n')

  const sum = lines.reduce((total, line): number => {
    const winningNumbers = formatSpaceDelimitedNumbersAsArray(line.split('|')[0].split(':')[1])
    const gameNumbers = formatSpaceDelimitedNumbersAsArray(line.split('|')[1])
    const matchesCount = getMatchesCount(winningNumbers, gameNumbers)

    const points = matchesCount ? 2 ** (matchesCount - 1) : 0

    return total + points
  }, 0)

  return sum
}

const formatSpaceDelimitedNumbersAsArray = (str: string): number[] => {
  return str.trim().split(/\s+/g).map(Number)
}

const getMatchesCount = (winningNumbers: number[], gameNumbers: number[]): number =>
  gameNumbers.reduce((matches, number): number => (winningNumbers.includes(number) ? matches + 1 : matches), 0)

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  const lines = input.split('\n')

  type Scorecard = {
    card: string
    count: number
  }

  const scorecards: Record<string, Scorecard> = lines.reduce(
    (obj, line, index) => ({ ...obj, [index + 1]: { card: line, count: 1 } }),
    {},
  )

  Object.keys(scorecards).forEach((cardNumber) => {
    const { card, count } = scorecards[cardNumber]

    Array.from({ length: count }).forEach(() => {
      const winningNumbers = formatSpaceDelimitedNumbersAsArray(card.split('|')[0].split(':')[1])
      const gameNumbers = formatSpaceDelimitedNumbersAsArray(card.split('|')[1])
      const matchesCount = getMatchesCount(winningNumbers, gameNumbers)

      for (let i = 1; i <= matchesCount; i++) {
        if (scorecards[Number(cardNumber) + i] !== undefined) {
          scorecards[Number(cardNumber) + i].count++
        }
      }
    })
  })

  const sum = Object.values(scorecards).reduce((total, scorecard): number => total + scorecard.count, 0)

  return sum
}

run({
  part1: {
    tests: [
      { input: 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53', expected: 8 },
      { input: 'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19', expected: 2 },
      { input: 'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1', expected: 2 },
      { input: 'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83', expected: 1 },
      { input: 'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36', expected: 0 },
      { input: 'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11', expected: 0 },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
