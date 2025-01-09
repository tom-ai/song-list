import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://yaqgpshbigfdzihldrgw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcWdwc2hiaWdmZHppaGxkcmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MTk0NzgsImV4cCI6MjA1MTk5NTQ3OH0.xtkfhfC9OZJlZfc5L81TkTg8N9jC941b1_ll7B4hS74'
);
