// Cifra las frases de frases.txt con la clave de clave.txt y las mete en index.html.
// Uso:  node cifrar.mjs
// frases.txt y clave.txt NO se suben a GitHub (están en .gitignore).
import fs from 'node:fs';
import crypto from 'node:crypto';

const ITER = 250000;
const PALABRAS = ['turron','polvoron','zambomba','villancico','reno','trineo','belen','muerdago',
  'mazapan','roscon','pandereta','estrella','abeto','campana','regalo','nieve','chimenea',
  'calcetin','cometa','pastorcillo','angelito','guirnalda','bufanda','mantecado'];

// 1) Clave: la de clave.txt o, si no existe, se inventa una y se guarda
if (!fs.existsSync('clave.txt')) {
  const p = () => PALABRAS[crypto.randomInt(PALABRAS.length)];
  fs.writeFileSync('clave.txt', `${p()}-${p()}-${p()}-${crypto.randomInt(10, 100)}\n`);
  console.log('Clave nueva creada en clave.txt');
}
const clave = fs.readFileSync('clave.txt', 'utf8').trim();

// 2) Frases (las líneas que empiezan por # son comentarios)
const frases = fs.readFileSync('frases.txt', 'utf8').split(/\r?\n/)
  .filter(l => l.trim() && !l.startsWith('#'));

// 3) Cifrado AES-GCM con clave derivada por PBKDF2-SHA256
const salt = crypto.randomBytes(16);
const key = crypto.pbkdf2Sync(clave, salt, ITER, 32, 'sha256');
const items = frases.map(f => {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const datos = Buffer.concat([c.update(f, 'utf8'), c.final(), c.getAuthTag()]);
  return iv.toString('base64') + '.' + datos.toString('base64');
});
const bloque = `const CIFRADO = ${JSON.stringify({ salt: salt.toString('base64'), iter: ITER, f: items })};`;

// 4) Sustituir en index.html entre los marcadores
const html = fs.readFileSync('index.html', 'utf8');
const re = /\/\*CIFRADO\*\/[\s\S]*?\/\*FIN\*\//;
if (!re.test(html)) throw new Error('No encuentro los marcadores /*CIFRADO*/ … /*FIN*/ en index.html');
fs.writeFileSync('index.html', html.replace(re, () => `/*CIFRADO*/${bloque}/*FIN*/`));
console.log(`${frases.length} frases cifradas en index.html`);
