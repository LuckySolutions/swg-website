// assets/js/supabase.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// For local: window.CONFIG from config.js
// For Vercel: NEXT_PUBLIC_ variables are automatically available
const supabaseUrl = window.CONFIG?.SUPABASE_URL || process?.env?.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = window.CONFIG?.SUPABASE_ANON_KEY || process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials', {
        url: supabaseUrl ? '✅' : '❌',
        key: supabaseKey ? '✅' : '❌'
    })
}

export const supabase = createClient(supabaseUrl, supabaseKey)