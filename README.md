# 🎄 Insultiento

Una casilla al día, del 1 de diciembre al 6 de enero.

Las frases van **cifradas** (AES-256-GCM) dentro de `index.html`. La clave no está en el repositorio: hace falta para leerlas.

## Abrirlo
- Con el enlace que lleva la clave: `https://ssanchez9.github.io/insulviento/#clave=LA-CLAVE`
- O abrir el enlace normal y escribir la clave una vez. El móvil la recuerda.

## Instalarlo en el iPhone
Abrir el enlace en **Safari** → botón Compartir → «Añadir a pantalla de inicio» → Añadir.
La primera vez que se abra desde la pantalla de inicio puede pedir la clave.

## Cambiar las frases (solo en el ordenador de quien lo hizo)
1. Editar `frases.txt` (una frase por línea; no se sube a GitHub).
2. Ejecutar `node cifrar.mjs`, que usa la clave de `clave.txt` (tampoco se sube).
3. Subir la versión en `sw.js` (`adviento-vN` → `adviento-vN+1`) y subir los cambios.
