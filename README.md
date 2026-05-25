# FiboPass Vault

## Título del proyecto
**FiboPass Vault: gestor educativo de contraseñas con Fibonacci y números primos**

## 1. ¿Qué problema real voy a resolver?

El problema real que se busca resolver es el uso de contraseñas débiles, repetidas o fáciles de adivinar. Actualmente muchas personas usan fechas de nacimiento, nombres, números simples o la misma contraseña en varias aplicaciones. Esto aumenta el riesgo de perder el acceso a cuentas personales, redes sociales, correos, plataformas educativas o servicios bancarios.

FiboPass Vault propone una página web educativa parecida a un gestor de contraseñas. Permite generar contraseñas más fuertes, analizar su nivel de seguridad y organizar cuentas por aplicación.

## 2. ¿Usaré Fibonacci, números primos o ambos?

Se usan ambos conceptos:

- **Serie de Fibonacci:** sirve para crear una secuencia numérica que mezcla posiciones y valores dentro del generador de contraseñas.
- **Números primos:** sirven para identificar valores especiales dentro de la secuencia Fibonacci y reforzar la generación de claves.

## 3. ¿Qué datos ingresará el usuario?

El usuario puede ingresar:

- Una palabra base.
- Un número base.
- La longitud de la contraseña.
- La cantidad de términos Fibonacci.
- Opciones para incluir mayúsculas, minúsculas, números y símbolos.
- Datos de una cuenta: aplicación, categoría, usuario, contraseña y nota.

## 4. ¿Qué resultado debe mostrar la página?

La página muestra:

- Una contraseña generada automáticamente.
- El nivel de seguridad de la contraseña: poco segura, media, segura o muy segura.
- La secuencia Fibonacci utilizada.
- Los números primos detectados dentro de la secuencia.
- Una bóveda visual con las cuentas guardadas.
- Tarjetas por aplicación con opción de mostrar, copiar o eliminar contraseñas.
- Un resumen general del nivel de seguridad de la bóveda.

## 5. ¿Cómo explicaré el algoritmo en lenguaje sencillo?

El algoritmo funciona así:

1. El usuario ingresa una palabra base, un número base y una longitud deseada.
2. JavaScript genera una secuencia Fibonacci usando variables simples.
3. Luego se revisa qué valores de esa secuencia son números primos.
4. La palabra base, el número base, los valores Fibonacci y los valores primos se combinan para seleccionar caracteres.
5. Con esa mezcla se forma una contraseña.
6. Después se analiza la contraseña revisando su longitud, uso de mayúsculas, minúsculas, números y símbolos.
7. Finalmente, el resultado se muestra en pantalla mediante `document.getElementById()`.

## 6. ¿Cómo haré que la página se vea bien en celular y computadora?

La página usa diseño responsivo con CSS. Se aplican:

- Grid y Flexbox.
- Media queries.
- Tarjetas adaptables.
- Formularios ordenados.
- Panel tipo dashboard.
- Diseño visual moderno inspirado en gestores de contraseñas.

Así, la página puede verse correctamente en computadoras, tablets y celulares.

## Explicación del problema

La seguridad digital es importante porque las personas manejan muchas cuentas: Google, Facebook, Instagram, TikTok, WhatsApp, GitHub, bancos, plataformas educativas y otros servicios. Recordar contraseñas seguras puede ser difícil, por eso existen gestores de contraseñas.

Este proyecto no busca reemplazar un gestor profesional, sino demostrar de manera educativa cómo las matemáticas y la programación pueden ayudar a crear y organizar contraseñas.

## Explicación del algoritmo

La serie Fibonacci inicia con valores como:

1, 1, 2, 3, 5, 8, 13...

Cada nuevo número se obtiene sumando los dos anteriores.

Un número primo es aquel que solo tiene dos divisores exactos: 1 y él mismo. Por ejemplo, 2, 3, 5, 7, 11 y 13 son números primos.

En este proyecto, Fibonacci genera una base numérica y los números primos ayudan a seleccionar posiciones especiales dentro del conjunto de caracteres. Esto permite crear contraseñas más variadas.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- Git
- GitHub Pages, Netlify o Vercel para publicar

## Estructura del proyecto

```bash
fibopass-vault/
│
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── script.js
└── README.md
```

## Importante

Este proyecto es educativo. Las contraseñas se guardan en `localStorage`, por lo tanto no se deben guardar contraseñas reales. Un gestor profesional debe usar cifrado, autenticación segura y protección avanzada.

## Enlace del repositorio Git

Agregar aquí el enlace del repositorio.

## Enlace de la página publicada

Agregar aquí el enlace de GitHub Pages, Netlify o Vercel.

## Autor

Agregar nombre del estudiante o grupo.
