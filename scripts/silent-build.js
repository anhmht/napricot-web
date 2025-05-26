#!/usr/bin/env node

// This script runs the build process with DEP0166 warnings suppressed
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

// Store original console.error
const originalError = console.error

// Override console.error to filter out DEP0166 warnings
console.error = function (...args) {
  // Check if the error message contains DEP0166
  if (
    args.length > 0 &&
    typeof args[0] === 'string' &&
    args[0].includes('DEP0166')
  ) {
    return
  }
  // Pass other errors through
  originalError.apply(console, args)
}

// Run the build process
const buildProcess = spawn('yarn', ['build:fast'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=4096 --no-deprecation',
    SUPPRESS_DEPRECATION: 'true'
  },
  shell: true
})

// Pipe stdout but filter DEP0166 warnings
buildProcess.stdout.on('data', (data) => {
  const output = data.toString()
  if (!output.includes('DEP0166')) {
    process.stdout.write(data)
  }
})

// Pipe stderr but filter DEP0166 warnings
buildProcess.stderr.on('data', (data) => {
  const output = data.toString()
  if (!output.includes('DEP0166')) {
    process.stderr.write(data)
  }
})

buildProcess.on('close', (code) => {
  process.exit(code)
})
