import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ikgjgddpwuunutgjbkbe.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZ2pnZGRwd3V1bnV0Z2pia2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzI3MjAsImV4cCI6MjA4OTQ0ODcyMH0.CKRY_klioFEnRPaCeVq4c2_op1ZCEPlVtwNOvFGkwho"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)