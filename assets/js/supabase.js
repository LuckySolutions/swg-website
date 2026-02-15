// assets/js/supabase.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// For local: use config.js (not committed)
// For production: hardcoded values (they're public anon keys, safe to expose)
const supabaseUrl = window.CONFIG?.SUPABASE_URL || 'https://vrwdenjnroyhugsbkrlz.supabase.co'
const supabaseKey = window.CONFIG?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyd2Rlbmpucm95aHVnc2Jrcmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNDU2NTcsImV4cCI6MjA4NjYyMTY1N30.kJsm5fPAiZDKVIpBsvN-dywHBbLuTdE-JYVAd0jvlzA'

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials')
}

export const supabase = createClient(supabaseUrl, supabaseKey)