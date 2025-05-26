#!/usr/bin/env node

import { spawn } from 'child_process'
import { performance } from 'perf_hooks'

const command = process.argv[2] || 'build:fast'

// Start the timer
const startTime = performance.now()

console.log(`🚀 Running build command: yarn ${command}`)
console.log('⏱️ Timing build process...\n')

// Create timestamp formatter
const formatTime = (ms) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

// Run the build process
const buildProcess = spawn('yarn', [command], {
  stdio: 'inherit',
  shell: true
})

buildProcess.on('exit', (code) => {
  const endTime = performance.now()
  const duration = endTime - startTime

  console.log('\n')
  console.log('==================================')
  console.log(
    `🏁 Build process ${code === 0 ? 'completed' : 'failed'} in ${formatTime(
      duration
    )}`
  )
  console.log(`   Total time: ${Math.round(duration) / 1000} seconds`)
  console.log('==================================')

  process.exit(code)
})

// Handle process termination
process.on('SIGINT', () => {
  buildProcess.kill('SIGINT')
  process.exit(1)
})
