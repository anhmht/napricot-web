#!/usr/bin/env node

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

async function analyzeClientBundle() {
  console.log('📊 Analyzing Nuxt build for optimization opportunities...')

  try {
    // Check if the client build directory exists
    const clientBuildDir = path.join(
      rootDir,
      '.nuxt',
      'dist',
      'client',
      '_nuxt'
    )
    await fs.access(clientBuildDir)

    // Read client bundle files
    const files = await fs.readdir(clientBuildDir)

    // Filter and organize by type
    const jsFiles = files.filter((file) => file.endsWith('.js'))
    const cssFiles = files.filter((file) => file.endsWith('.css'))

    // Get file stats
    const jsFilesWithStats = await Promise.all(
      jsFiles.map(async (file) => {
        const filePath = path.join(clientBuildDir, file)
        const stats = await fs.stat(filePath)
        return {
          name: file,
          size: stats.size,
          sizeFormatted: formatBytes(stats.size)
        }
      })
    )

    // Sort by size (largest first)
    jsFilesWithStats.sort((a, b) => b.size - a.size)

    // Get total size
    const totalJsSize = jsFilesWithStats.reduce(
      (sum, file) => sum + file.size,
      0
    )
    const totalCssSize = (
      await Promise.all(
        cssFiles.map(async (file) => {
          const stats = await fs.stat(path.join(clientBuildDir, file))
          return stats.size
        })
      )
    ).reduce((sum, size) => sum + size, 0)

    // Display results
    console.log('\n🔍 Bundle Analysis')
    console.log('==================')
    console.log(`Total JS Size: ${formatBytes(totalJsSize)}`)
    console.log(`Total CSS Size: ${formatBytes(totalCssSize)}`)
    console.log(`Total Bundle Size: ${formatBytes(totalJsSize + totalCssSize)}`)

    console.log('\n📄 Largest JS Files:')
    jsFilesWithStats.slice(0, 10).forEach((file, index) => {
      const percentOfTotal = ((file.size / totalJsSize) * 100).toFixed(1)
      console.log(
        `${index + 1}. ${file.name} - ${
          file.sizeFormatted
        } (${percentOfTotal}% of JS bundle)`
      )
    })

    // Generate recommendations
    console.log('\n🔧 Optimization Recommendations:')

    // Check for large bundles
    const largeFiles = jsFilesWithStats.filter((file) => file.size > 250 * 1024) // > 250KB
    if (largeFiles.length > 0) {
      console.log('- Large bundle files detected. Consider:')
      console.log('  - Using dynamic imports for large components')
      console.log('  - Improving code splitting with more granular chunks')
      console.log('  - Check for unnecessary dependencies in these files')
    }

    // Check build config
    console.log('- Nuxt build improvements:')
    console.log('  - Ensure unused component detection is enabled')
    console.log('  - Use lazy-loading for components where appropriate')
    console.log('  - Consider tree-shaking libraries (especially Element Plus)')

    console.log('\n✅ Bundle analysis complete!')
  } catch (error) {
    console.error('❌ Error analyzing bundle:', error.message)
    if (error.code === 'ENOENT') {
      console.log(
        'Build directory not found. Run a build first with `yarn build`'
      )
    }
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

analyzeClientBundle()
