#!/usr/bin/env node

/**
 * Script untuk memvalidasi environment variables yang dibutuhkan
 * Jalankan dengan: npm run check-env
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

console.log('🔍 Checking environment variables...\n');

let hasError = false;

requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  
  if (!value) {
    console.log(`❌ ${envVar}: MISSING`);
    hasError = true;
  } else {
    // Show partial value for security
    const displayValue = value.length > 20 
      ? value.substring(0, 20) + '...' 
      : value;
    console.log(`✅ ${envVar}: ${displayValue}`);
  }
});

console.log('\n📋 Environment Check Summary:');

if (hasError) {
  console.log('❌ Some environment variables are missing!');
  console.log('\n📝 To fix this:');
  console.log('1. Copy .env.example to .env.local');
  console.log('2. Fill in your Supabase project values');
  console.log('3. For production, set these in your deployment platform');
  console.log('\n🔗 Get your Supabase values from:');
  console.log('   Project Settings > API > URL & anon key');
  
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set!');
  console.log('\n🚀 You can now run: npm run build');
}

// Additional checks
if (process.env.NODE_ENV === 'production') {
  console.log('\n🏭 Production environment detected');
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (url && !url.startsWith('https://')) {
    console.log('⚠️  Warning: Supabase URL should use HTTPS in production');
  }
} 