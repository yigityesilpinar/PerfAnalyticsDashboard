import fs from 'fs'
import { ChunkExtractorOptions } from '@loadable/server'

let STATS_CACHE = ''
// TODO: write tests and jsdocs
export const waitAndRequireStatsFile = (statsFilePath: string) =>
  new Promise<ChunkExtractorOptions>((resolve, reject) => {
    if (STATS_CACHE) {
      return resolve({
        stats: JSON.parse(STATS_CACHE),
      })
    }
    let counter = 0
    const limit = 10
    const interval = setInterval(() => {
      counter++
      if (fs.existsSync(statsFilePath)) {
        clearInterval(interval)
        try {
          STATS_CACHE = fs.readFileSync(statsFilePath).toString()
          resolve({
            stats: JSON.parse(STATS_CACHE),
          })
        } catch (err) {
          reject(err)
        }
      } else {
        // file does not exist
        if (counter > limit) {
          clearInterval(interval)
          reject('too many tries')
        }
      }
    }, 500)
  })
