// assets/js/supabase.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// For production: use window.env from Vercel
// For local: window.CONFIG from config.js
const supabaseUrl = window.CONFIG?.SUPABASE_URL || window.env?.VITE_SUPABASE_URL
const supabaseKey = window.CONFIG?.SUPABASE_ANON_KEY || window.env?.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials', {
        url: supabaseUrl ? '✅' : '❌',
        key: supabaseKey ? '✅' : '❌'
    })
}

export const supabase = createClient(supabaseUrl, supabaseKey)