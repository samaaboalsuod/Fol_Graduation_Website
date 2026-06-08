const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://otnuzlslyxxpczlmiytz.supabase.co', 'sb_publishable_NEe8nx_Kzo3oxDDB_tFarA_pRe2qVL6');

async function test() {
  const { data, error } = await supabase.from('QuizJourney').select('*').limit(2);
  console.log("Data:", data);
  console.log("Error:", error);
}

test();
