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
  const destinationValue = sourceValue - transformation

  return destinationValue
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
  const seeds = getSeeds(input)
  console.log('seeds', seeds)

  const locationsFromSeeds = seeds.reduce((locations, seedAndRange): number[] => {
    const seedRangeLocations: number[] = []

    for (let i = 0; i < seedAndRange.range; i = i + 100000) {
      const location = getLocationFromSeed(seedAndRange.seed + i, input)
      // console.log('location', location)
      seedRangeLocations.push(location)
    }

    console.log('seedRangeLocations', seedRangeLocations)
    return [...locations, ...seedRangeLocations]

    // return getLocationFromSeed(Number(seed), input)
  }, [] as number[])
  console.log('locationsFromSeeds', locationsFromSeeds)

  const minLocationIndex = locationsFromSeeds.reduce((minIndex, location, index) => {
    return location < locationsFromSeeds[minIndex] ? index : minIndex
  }, 0)

  const minLocation = locationsFromSeeds[minLocationIndex]
  console.log('minLocation', minLocation)

  return minLocation
}

type SeedAndRange = {
  seed: number
  range: number
}

const getSeeds = (input: string): SeedAndRange[] => {
  const seedsAndRanges = input.split('\n')[0].replace('seeds: ', '').split(' ')
  const seeds: SeedAndRange[] = []

  // sort relevant map lines by highest to lowest seed number
  const mapLines = getMapLinesSortedBySourceDesc({ mapping: 'seed-to-soil', input })
  const sourceValues = mapLines.map((line) => Number(line.split(' ')[1]))
  console.log('sourceValues', sourceValues)

  // find the first line with a range that includes the seed number
  // const mapLineInSeedRange = mapLines.find((mapLine) => {
  //   const [_, source, range] = mapLine.split(' ')
  //   return source >= Number(source) && sourceValue <= Number(source) + Number(range)
  // })

  for (let i = 0; i < seedsAndRanges.length; i = i + 2) {
    const seed = Number(seedsAndRanges[i])
    const range = Number(seedsAndRanges[i + 1])
    seeds.push({ seed, range })
  }

  const seedsDesc = seeds.sort((a, b) => b.seed - a.seed)
  console.log('seedsDesc', seedsDesc)

  return seeds
}

const getLocationFromSeed2 = (seed: number, input: string): number => {
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
