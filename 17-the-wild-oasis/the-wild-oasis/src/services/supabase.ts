import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://suvvuyiveqgnbyuommao.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dnZ1eWl2ZXFnbmJ5dW9tbWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxNDQwNDcsImV4cCI6MjAxMTcyMDA0N30.TMxUXAbOldol22SO8Dzo6Abc5qScB4xGPDtsR90QgEY'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;