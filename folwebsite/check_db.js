const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const supabaseContent = fs.readFileSync('src/Supabase.jsx', 'utf8');
const matchUrl = supabaseContent.match(/createClient\(['"](.*?)['"],\s*['"](.*?)['"]\)/);
if (matchUrl) {
  const supabase = createClient(matchUrl[1], matchUrl[2]);
  supabase.from('QuizJourney').select('*').limit(1).then(res => { console.log(res); process.exit(0); });
}
