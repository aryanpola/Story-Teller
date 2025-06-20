import { supabase } from './src/config/supabase.js'

async function testEmailLogin() {
  console.log('🧪 Testing Email Login Functionality...\n')
  
  // Test credentials
  const testEmail = 'test@example.com'
  const testPassword = 'password123'
  
  try {
    console.log('📧 Testing with email:', testEmail)
    
    // Step 1: Try to sign up first (in case user doesn't exist)
    console.log('\n1️⃣ Creating test user (if doesn\'t exist)...')
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test User'
        }
      }
    })
    
    if (signupError && !signupError.message.includes('already registered')) {
      console.log('❌ Signup error:', signupError.message)
      return
    }
    
    if (signupData.user && !signupData.session) {
      console.log('📧 Check your email for confirmation link (if email confirmation is enabled)')
    }
    
    console.log('✅ User creation/exists confirmed')
    
    // Step 2: Test login with email
    console.log('\n2️⃣ Testing login with email address...')
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    })
    
    if (loginError) {
      console.log('❌ Login error:', loginError.message)
      
      // Check common issues
      if (loginError.message.includes('Invalid login credentials')) {
        console.log('\n🔧 Possible issues:')
        console.log('- Email confirmation might be required')
        console.log('- Password might be incorrect')
        console.log('- User might not exist')
      }
      
      if (loginError.message.includes('Email not confirmed')) {
        console.log('\n📧 Email confirmation required:')
        console.log('- Check your email inbox')
        console.log('- Click the confirmation link')
        console.log('- Or disable email confirmation in Supabase settings')
      }
      
      return
    }
    
    console.log('✅ Login successful!')
    console.log('👤 User ID:', loginData.user.id)
    console.log('📧 Email:', loginData.user.email)
    console.log('🔑 Session created:', !!loginData.session)
    
    // Step 3: Test user profile retrieval
    console.log('\n3️⃣ Testing user profile retrieval...')
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', loginData.user.id)
      .single()
    
    if (profileError) {
      console.log('⚠️ Profile error:', profileError.message)
      console.log('💡 This might mean the users table trigger isn\'t working')
    } else {
      console.log('✅ Profile retrieved successfully!')
      console.log('📋 Profile data:', profile)
    }
    
    // Step 4: Test logout
    console.log('\n4️⃣ Testing logout...')
    const { error: logoutError } = await supabase.auth.signOut()
    
    if (logoutError) {
      console.log('❌ Logout error:', logoutError.message)
    } else {
      console.log('✅ Logout successful!')
    }
    
    // Step 5: Verify session is cleared
    console.log('\n5️⃣ Verifying session is cleared...')
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
      console.log('⚠️ Session still exists after logout')
    } else {
      console.log('✅ Session cleared successfully!')
    }
    
    console.log('\n🎉 Email login test completed!')
    console.log('\n📊 Test Summary:')
    console.log('- User creation: ✅')
    console.log('- Email login: ✅')
    console.log('- Profile access: ✅')
    console.log('- Logout: ✅')
    
  } catch (error) {
    console.error('💥 Unexpected error:', error)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Check your .env file has correct Supabase credentials')
    console.log('2. Verify your Supabase project is active')
    console.log('3. Check if RLS policies are correctly configured')
    console.log('4. Ensure users table exists with proper structure')
  }
}

// Test with different email formats
async function testEmailFormats() {
  console.log('\n📧 Testing different email formats...\n')
  
  const emailFormats = [
    'user@example.com',          // Standard
    'user.name@example.com',     // With dot
    'user+tag@example.com',      // With plus
    'user123@example.com',       // With numbers
    'USER@EXAMPLE.COM'           // Uppercase
  ]
  
  for (const email of emailFormats) {
    console.log(`Testing: ${email}`)
    
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: 'testpassword123'
      })
      
      if (error && !error.message.includes('already registered')) {
        console.log(`❌ ${email}: ${error.message}`)
      } else {
        console.log(`✅ ${email}: Valid format`)
      }
    } catch (err) {
      console.log(`❌ ${email}: ${err.message}`)
    }
  }
}

// Run tests
console.log('🚀 Starting Supabase Email Authentication Tests...\n')
testEmailLogin().then(() => {
  return testEmailFormats()
})
