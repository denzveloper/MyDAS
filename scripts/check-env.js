#!/usr/bin/env node

/**
 * Script untuk mengecek environment variables sebelum deployment
 * Jalankan dengan: node scripts/check-env.js
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
]

const optionalEnvVars = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET'
]

console.log('🔍 Checking Environment Variables...\n')

let hasErrors = false

// Check required variables
console.log('📋 Required Variables:')
requiredEnvVars.forEach(varName => {
  const value = process.env[varName]
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`)
  } else {
    console.log(`❌ ${varName}: MISSING`)
    hasErrors = true
  }
})

console.log('\n📋 Optional Variables:')
optionalEnvVars.forEach(varName => {
  const value = process.env[varName]
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`)
  } else {
    console.log(`⚠️  ${varName}: Not set (optional)`)
  }
})

console.log('\n' + '='.repeat(50))

if (hasErrors) {
  console.log('❌ DEPLOYMENT WILL FAIL!')
  console.log('\n🔧 To fix this:')
  console.log('1. Copy .env.local to .env.production')
  console.log('2. Or set environment variables in your deployment platform')
  console.log('3. Check DEPLOYMENT.md for platform-specific instructions')
  process.exit(1)
} else {
  console.log('✅ All required environment variables are set!')
  console.log('🚀 Ready for deployment!')
  process.exit(0)
} 