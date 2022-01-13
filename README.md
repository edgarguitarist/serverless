# Curso de Javascript ES9, HTML5, CSS3 y Node.js desde Cero de Nicolas Schurmann

Curso terminado con el proyecto de una aplicación web con HTML, JavaScript y CSS que utiliza Node.js, Express y MongoDB.

## Links
- 🖼️ [Sitio Terminado](https://serverless-edgarguitarist.vercel.app)
- 🎖️ [Curso en Udemy de Nicolas Schurmann](https://www.udemy.com/course/aprende-javascript-es9-html-css3-y-nodejs-desde-cero/)
- <img style="margin-left:2px;" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg" alt="midudev" height="16px" width="16px"/> [Mi Github](https://github.com/edgarguitarist)

## Instalación
Puedes abrir en tu navegador el `index.html` de la carpeta `app` y probar el `Frontend` del sitio en tu computadora, el resto de archivos y carpetas son del `Backend`, en este caso de las `APIs Serverless` con `Node.js`, `Express` y `MongoDB`.

## Problemas
Dentro del Proyecto me encontre con dos inconvenientes:

### 1. Deploy a Vercel y Vercel Dev
Al momento de ejecutar el comando `Vercel Dev` en `Windows` para lanzar el sitio en el `Localhost` obtenía el siguiente error:

```powershell
"rm" no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable. npm ERR! code ELIFECYCLE npm ERR! errno 1 npm ERR! @ build: rm -rf public && mkdir public && echo 'Custom Build' > ./public/index.html npm ERR! Exit status 1 npm ERR! npm ERR! Failed at the @ build script. npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in: npm ERR! C:\Users\YourUser\AppData\Roaming\npm-cache_logs\2021-01-11T20_35_00_063Z-debug.log Error! Command "npm run build" exited with 1
```

#### 1.1. Solución
En la configuración del package.json, en la propiedad build hay que cambiar "rm -rf" por "rmdir /q/s".

```json
{
    "scripts": {
        "build": "rmdir /q/s public && mkdir public && echo 'Custom Build' > ./public/index.html"
    },
    "dependencies": {
        "body-parser": "^1.19.1",
        "cors": "^2.8.5",
        "express": "^4.17.2",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^6.1.6"
    }
}
```

Otra Solución que encontré fue instalar `GitBash` pero esta no la probé ya que la primera me funciono.

Cabe recalcar que al momento de hacer un deploy a Vercel el comando debe regresar a como esta al principio o saldrá otro mensaje de error y deteniendo el Deploy.

### 2. Post Orders
Casi al finalizar el curso luego de hacer el login y de cambiar los templates al momento de hacer login o de llamar a la función `renderOrders() ` y esta llamar a la función `initializeForm()` al momento de hacer el `fetch` a la api de orders esta va a necesitar de la propiedad authorization en el header.

#### 2.1. Solución

```js
fetch("https://serverless-edgarguitarist.vercel.app/api/orders", {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token") // <-- Linea faltante para hacer el POST 
    }, 
    body: JSON.stringify(order),
})
```

## Recomendaciones
El curso para alguien nuevo en el programación puede llegar a abrumar sobre todo una vez que empieza la parte de `Node.js` ya que abarca muchos temas, sin embargo es posible seguir el ritmo prestando atención, repasando los temas, viendo las notas de los demás y las respuestas a las consultas de otros compañeros.

Sin nada más que decir, el curso es una buena herramienta para aprender y felicidades por comenzar!

👽🙌🏽✨✨✨✨✨✨
