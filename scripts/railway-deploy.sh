#!/bin/bash

echo "🚀 MIDAS Railway Deployment Helper"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📋 Pre-deployment checklist:"
echo ""

# Check build
echo "🔧 Testing build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please fix errors first."
    exit 1
fi

echo ""
echo "📝 Railway Environment Variables Setup:"
echo ""
echo "1. Go to: https://railway.app"
echo "2. Select your project"
echo "3. Go to 'Variables' tab"
echo "4. Add these variables:"
echo ""
echo "   NEXT_PUBLIC_SUPABASE_URL=https://ycsorzkykxyfeazkmoei.supabase.co"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc29yemt5a3h5ZmVhemttb2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzk3NzYsImV4cCI6MjA2MzkxNTc3Nn0.xt2aFoHnX0fw9mYsWEtlFVPVx9y57QmMXN_-q1H2uyE"
echo ""
echo "5. Railway will automatically redeploy"
echo ""

echo "✅ Your app is ready for deployment!"
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🔗 After deployment, test these URLs:"
echo "   - https://your-domain.com/"
echo "   - https://your-domain.com/test-supabase"
echo "   - https://your-domain.com/services"
echo ""
echo "🎉 Happy deploying!" 