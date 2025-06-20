import { supabase } from './src/config/supabase.js'

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase connection...')
  
  try {
    // Test 1: Check if Supabase client is configured
    console.log('✅ Supabase client created')
    console.log('📍 URL:', supabase.supabaseUrl)
    
    // Test 2: Test auth connection (get session)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.log('⚠️  Session error (this is normal if no user is logged in):', sessionError.message)
    } else {
      console.log('✅ Auth connection successful')
      if (session) {
        console.log('👤 User logged in:', session.user.email)
      } else {
        console.log('👤 No user currently logged in')
      }
    }
    
    // Test 3: Test database connection (try to read users table)
    const { data: users, error: dbError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (dbError) {
      console.log('❌ Database connection error:', dbError.message)
      console.log('💡 Make sure you ran the SQL schema in Supabase dashboard')
    } else {
      console.log('✅ Database connection successful')
      console.log('📊 Users table accessible')
    }
    
    console.log('\n🎉 Supabase setup test completed!')
    console.log('👉 You can now run: npm run dev:client')
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Check your .env file has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
    console.log('2. Make sure you ran the SQL schema in Supabase dashboard')
    console.log('3. Check your Supabase project is active')
  }
}

testSupabaseConnection()
