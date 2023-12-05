import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const lines = input.split('\n')

  // Identify symbols
  const symbols = new Set<string>()
  lines.forEach((line) => {
    const symbolsInLine = line.match(/[^.\d\w]/g)

    symbolsInLine?.forEach((symbol) => {
      // if (!symbol) return
      symbols.add(symbol)
    })
  })

  lines.forEach((line, lineIndex) => {
    const numbersInLine = line.match(/\d+/g)
    console.log('numbersInLine', numbersInLine)

    const numsAdjToSymbols = numbersInLine?.map((number) => {
      const startIndexOfNumber = line.indexOf(number)
      const endIndexOfNumber = startIndexOfNumber + number.length

      for (let i = startIndexOfNumber; i < endIndexOfNumber; i++) {
        console.log('line[i]', line[i])
        // TODO: check if number is adjucent to a symbol in any direction
        if (symbols.has(line[lineIndex - 1][i - 1])) {
          return number
        }
      }
    })
  })
  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
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
