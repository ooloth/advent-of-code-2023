import run from 'aocrunner'
import { get } from 'http'

const parseInput = (rawInput: string): string => rawInput

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput)
  const seeds = input.split('\n')[0].replace('seeds: ', '').split(' ')
  const locationsFromSeeds = seeds.map((seed) => getLocationFromSeed(Number(seed), input))

  const minLocationIndex = locationsFromSeeds.reduce((minIndex, location, index) => {
    return location < locationsFromSeeds[minIndex] ? index : minIndex
  }, 0)

  const minLocation = locationsFromSeeds[minLocationIndex]

  return minLocation
}

type Mapping =
  | 'seed-to-soil'
  | 'soil-to-fertilizer'
  | 'fertilizer-to-water'
  | 'water-to-light'
  | 'light-to-temperature'
  | 'temperature-to-humidity'
  | 'humidity-to-location'

const getLocationFromSeed = (seed: number, input: string): number => {
  const mappings: Mapping[] = [
    'seed-to-soil',
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location',
  ]

  return mappings.reduce((nextValue, mapping): number => getDestinationFromSource(nextValue, mapping, input), seed)
}

const getDestinationFromSource = (sourceValue: number, mapping: Mapping, input: string): number => {
  // sort relevant map lines by highest to lowest seed number
  const mapLines = getMapLinesSortedBySourceDesc({ mapping, input })

  // find the first line with a range that includes the seed number
  const mapLineInSeedRange = mapLines.find((mapLine) => {
    const [_, source, range] = mapLine.split(' ')
    return sourceValue >= Number(source) && sourceValue <= Number(source) + Number(range)
  })

  // If no map rule ranges capture the source number, the destination number is the same
  if (!mapLineInSeedRange) {
    return sourceValue
  }

  // Otherwise, transform the destination number based on the map rule
  const [destination, source] = mapLineInSeedRange!.split(' ')
  const transformation = Number(source) - Number(destination)
  const soil = sourceValue - transformation

  return soil
}

type GetMapArgs = {
  mapping: Mapping
  input: string
}

const getMapLinesSortedBySourceDesc = ({ mapping, input }: GetMapArgs): string[] => {
  const paragraphs = input.split('\n\n').slice(1)
  const paragraph = paragraphs.find((paragraph): boolean => paragraph.includes(mapping))!
  const mapLines = paragraph.split('\n').slice(1)

  const sortedMapLines = mapLines.sort((a, b): number => {
    const aSource = Number(a.split(' ')[1])
    const bSource = Number(b.split(' ')[1])
    return bSource - aSource
  })

  return sortedMapLines
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
