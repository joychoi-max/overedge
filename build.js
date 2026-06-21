const fs = require('fs');
const path = require('path');

const replacements = {
  '__SUPABASE_URL__': process.env.SUPABASE_URL || '',
  '__SUPABASE_KEY__': process.env.SUPABASE_KEY || '',
  '__FIREBASE_API_KEY__': process.env.FIREBASE_API_KEY || '',
  '__FIREBASE_AUTH_DOMAIN__': process.env.FIREBASE_AUTH_DOMAIN || '',
  '__FIREBASE_PROJECT_ID__': process.env.FIREBASE_PROJECT_ID || '',
  '__FIREBASE_STORAGE_BUCKET__': process.env.FIREBASE_STORAGE_BUCKET || '',
  '__FIREBASE_MESSAGING_SENDER_ID__': process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  '__FIREBASE_APP_ID__': process.env.FIREBASE_APP_ID || '',
};

const outDir = path.join(__dirname, 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

['index.html', 'admin.html'].forEach(file => {
  const src = path.join(__dirname, file);
  if (!fs.existsSync(src)) return;
  let content = fs.readFileSync(src, 'utf8');
  for (const [placeholder, value] of Object.entries(replacements)) {
    content = content.replaceAll(placeholder, value);
  }
  fs.writeFileSync(path.join(outDir, file), content, 'utf8');
  console.log(`Built: ${file}`);
});
