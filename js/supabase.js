// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://moueclfhpfdqobjprlbb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdWVjbGZocGZkcW9ianBybGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTY4NDAsImV4cCI6MjA5MDAzMjg0MH0.yF_9wkhAaxq8H2DW15CDxbx6xrwg7kbsN5i7_3kHmUk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
