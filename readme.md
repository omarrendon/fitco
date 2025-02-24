# Proyecto reservaciones

## El objetivo de esta prueba técnica es crear un sistema de reservas, donde tendremos divido el proyecto en dos partes, backend y frontend, en este mismo repositorio tenemos ambos proyectos.

## Para ejecutar ambos proyectos seguir las siguientes indicaciones

1. Descargar este repositorio

# Frontend

2. una ves estando en la carpeta raiz (Fitco) dirigirse a la carpeta `fitco-frontend`
3. Ya estando dentro de la carpeta ejecutar el siguiente comando `npm install`
4. Ya instaladas todas las dependencias levantamos el proyecto `npm run dev`
5. Ya una ves con el proyecto ejecutandose, seguirmeos con la parte del backend

# Backend

6. Volvemos a la carpeta raiz `cd ../` y despues ingresamos ahora a la carpeta `fitco-backend`
7. Una ves en la carpeta instalamos todas las dependecias `npm i`
8. Necesitamos tener instalado `Docker` para levantar nuestra base de datos
9. Podremos encontrar nuestro archivo `docker-compose.yml` en la raiz de la carpeta
10. Ejecutamos el siguiente comando estando en la raiz de nuestro proeycto `fitco-backend` - `docker-compose up -d`
11. Una vez que confirmamos que tenemos nuestro contener ejecutandose junto con nuestra imagen continuamos a ejecutar el comando `node src/config/sync.js` lo cual sincronizara nuestra base de datos
    11 . Teniendo ya nuestra base de datos lista, hacemos un par inserciones a nuestra base de datos. (Usar postman o cualquier otro)

- Primero instalar nodemon para levanatar nuestro servidor `nodemon src\app.js` verifiquemos que corre en el puerto 8000
- `http://localhost:8000/api/auth/register` usamos la ruta para insertar un nuevo usuario con el siguiente body
  `  {
  "name": "Admin",
  "email": "admin@test.com",
  "password": "test",
  "role": "admin"
}`
  siguiente usuario
  `   {
  "name": "User",
  "email": "user@test.com",
  "password": "test",
  "role": "user"
}`

12. Ya que hayamos insertado nuestros usuarios, volvemos al navegador e iniciamos sesion con nuestras cuenta de administrador
13. Una vez logeados con la cuenta de administrador podremos crear servicios nuevos (solo administrasdor puede crear nuevos servicios)
14. Como usuario podremos ver los servicios creados y podremos reservar el que mas nos guste.

## Librerias utilizadas

### Backend

` "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.13.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.5"`

### Frontend

`"@emotion/react": "^11.14.0",
"@emotion/styled": "^11.14.0",
"@mui/icons-material": "^6.4.5",
"@mui/material": "^6.4.5",
"@mui/x-date-pickers": "^7.27.0",
"axios": "^1.7.9",
"date-fns": "^4.1.0",
"dayjs": "^1.11.13",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-router": "^7.2.0",
"@types/react": "^19.0.8",
"@types/react-dom": "^19.0.3",
"@vitejs/plugin-react": "^4.3.4",
"eslint": "^9.19.0",
"eslint-plugin-react-hooks": "^5.0.0",
"eslint-plugin-react-refresh": "^0.4.18",
"globals": "^15.14.0",
"typescript": "~5.7.2",
"typescript-eslint": "^8.22.0",
"vite": "^6.1.0"`
