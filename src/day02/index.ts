import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const redCubes = 12
  const greenCubes = 13
  const blueCubes = 14

  const possibleGames: number[] = []

  const games = input.split('\n')

  games.forEach((game) => {
    const sets = game.split('; ')

    const isPossible = sets.map((set) => {
      const redTotal = getColorTotal('red', set)
      if (redTotal > redCubes) return false

      const greenTotal = getColorTotal('green', set)
      if (greenTotal > greenCubes) return false

      const blueTotal = getColorTotal('blue', set)
      if (blueTotal > blueCubes) return false

      return true
    })

    if (isPossible.includes(false)) return

    const gameNumber = game.match(/\d+/)?.[0] as string
    possibleGames.push(Number(gameNumber))
  })

  const total = possibleGames.reduce((sum, index): number => sum + index, 0)

  return total
}

const getColorTotal = (color: string, line: string): number => {
  const colorRegex = new RegExp(`\\d+ ${color}`, 'g')
  const colorMatches = line.match(colorRegex) ?? []
  const colorCount = colorMatches.reduce((total, match): number => {
    const count = match.replace(` ${color}`, '')
    return total + Number(count)
  }, 0)
  return colorCount
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const minSetPowers: number[] = []

  const games = input.split('\n')

  games.forEach((game) => {
    const sets = game.split('; ')

    const minimums = { red: 0, green: 0, blue: 0 }

    sets.forEach((set) => {
      Object.keys(minimums).forEach((color) => {
        const colorTotal = getColorTotal(color, set)
        if (colorTotal > minimums[color as keyof typeof minimums]) {
          minimums[color as keyof typeof minimums] = colorTotal
        }
      })
    })

    const minSetPower = Object.values(minimums).reduce((total, min) => total * min, 1)

    minSetPowers.push(minSetPower)
  })

  const total = minSetPowers.reduce((sum, index): number => sum + index, 0)

  return total
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
