import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://otnuzlslyxxpczlmiytz.supabase.co';
const supabaseKey = 'sb_publishable_NEe8nx_Kzo3oxDDB_tFarA_pRe2qVL6';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const tables = ['Plants', 'Plant', 'plants', 'plant', 'Plant_Table'];
  for (let t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    if (!error) {
      console.log('SUCCESS:', t);
    } else {
      console.log('ERROR for', t, error.message);
    }
  }
}

test();
