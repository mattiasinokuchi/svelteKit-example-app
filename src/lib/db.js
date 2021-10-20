import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default supabase;

import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: import.meta.env.VITE_SUPABASE_HOST,
  database: 'postgres',
  password: import.meta.env.VITE_SUPABASE_PASSWORD,
  port: import.meta.env.VITE_SUPABASE_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})