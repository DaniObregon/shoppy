Análisis y Resumen del funcionamiento de desploegue segun ambiente.

1. client/vite.config.js
Este archivo configura Vite para el cliente React del proyecto. Incluye:

Carga de variables de entorno: Según el valor de NODE_ENV, se carga un archivo .env, .env.test, o .env.local usando dotenv.
Configuración del servidor de desarrollo:
Utiliza un proxy para redirigir las rutas /api y /admin-api al backend correspondiente según el entorno (localhost en desarrollo o un dominio en producción).
Configura el puerto del servidor de desarrollo y habilita el uso de polling para observar cambios en archivos.
Opciones de construcción: Especifica firebaseConfig.js como dependencia externa para evitar incluirla en el bundle.
2. control-server.js
Este archivo administra el servidor en entornos de desarrollo.

Ejecución Condicional: Solo se ejecuta si NODE_ENV no es production.
Inicio del servidor backend:
Utiliza child_process.exec para correr el comando npm run start:server desde la carpeta server.
Captura y muestra la salida estándar y de errores en la consola.
Manejo de señal SIGINT:
Al interrumpir el proceso (Ctrl+C), detiene el servidor backend y ejecuta npx sequelize-cli db:seed:undo:all para revertir los seeders.
Luego, termina el proceso de servidor y cierra el programa.
Modo Producción: Muestra un mensaje indicando que el script está deshabilitado.
3. server/config/config.js
Este archivo contiene la configuración de la base de datos para diferentes entornos (development, test, y production):

Carga de variables de entorno: Selecciona el archivo adecuado (.env, .env.test, .env.local) según NODE_ENV y las expone a través de process.env.
Configuraciones específicas por entorno:
development y test usan credenciales de conexión definidas en variables de entorno (DB_USER, DB_PASSWORD, etc.).
production utiliza DATABASE_URL para la conexión y habilita SSL para bases de datos PostgreSQL.
4. server/server.js
Este es el punto de entrada del backend Express:

Configuración del servidor:
Carga el archivo de entorno correspondiente según NODE_ENV.
Define middlewares para procesar JSON, manejar CORS, y enrutar solicitudes usando los archivos de rutas (routes).
Inicio del servidor:
Si NODE_ENV no es test, inicia el servidor en el puerto especificado por SERVER_PORT (5000 por defecto) y sincroniza la base de datos con Sequelize.
Manejo de señal SIGINT:
Imprime un mensaje y detiene el servidor de manera ordenada al recibir la señal de interrupción.
Exportación: Permite usar la instancia de app en otros archivos, como en tests.

Resumen
Gestión de Entornos
El proyecto soporta múltiples entornos (development, test, production) mediante el uso de archivos de configuración .env. Según el entorno, se carga el archivo adecuado automáticamente.

Ejecución del Servidor
Desarrollo:

Ejecuta npm run dev para iniciar el cliente y backend.
El backend se administra desde control-server.js, el cual sincroniza la base de datos y ejecuta seeders si es necesario.
Interrumpir el proceso (Ctrl+C) deshará los seeders aplicados en la base de datos.
Producción:

La configuración de producción usa variables centralizadas en DATABASE_URL y está optimizada para PostgreSQL con SSL habilitado.
Configuración del Cliente (Vite)
El cliente utiliza Vite para un entorno rápido de desarrollo.
Las peticiones /api y /admin-api se redirigen al backend mediante un proxy, soportando tanto entornos locales como producción.
Scripts Importantes
Backend:
npm run start:server - Inicia el backend.
npm run undo:seeders - Deshace todos los seeders en la base de datos.
Cliente:
npm run dev - Inicia el cliente con Vite.
Requisitos Previos
Crear y configurar los archivos .env, .env.test, y .env.local con las variables necesarias para el cliente y el servidor.
Asegurarse de que las dependencias (npm install) estén instaladas tanto en client como en server.
