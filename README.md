
# Administrador de Servicios

Proyecto desarrollado en Node.js para gestionar servicios de un sistema de turnos y reservas. Permite consultar, agregar, actualizar y eliminar servicios mediante una API REST desarrollada con Express.

## Instalación

Clonar el repositorio e instalar las dependencias con:

```bash
npm install
```

## Ejecución

Para ejecutar el proyecto:

```bash
npm start
```

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Las variables requeridas son:

```env
PORT=8080
NODE_ENV=development
```

## Recurso Services

Cada servicio representa una prestación disponible dentro del sistema de turnos y reservas.

Cada servicio contiene las siguientes propiedades:

- `id`: identificador único del servicio.
- `name`: nombre del servicio.
- `description`: descripción del servicio.
- `duration`: duración del servicio.
- `price`: precio del servicio.
- `category`: categoría a la que pertenece.
- `available`: indica si el servicio se encuentra disponible.

----------------------------------------------------------------------------------------

## API REST

La aplicación expone endpoints REST para gestionar el recurso `services` mediante Express.

### Obtener todos los servicios

`GET /api/services`

Devuelve todos los servicios disponibles. Permite filtrar por categoría y disponibilidad mediante query params.

Ejemplo:

```http
GET http://localhost:8080/api/services
```

Ejemplo con filtros:

```http
GET http://localhost:8080/api/services?category=peluqueria&available=true
```

### Obtener un servicio por ID

`GET /api/services/:id`

Devuelve el servicio correspondiente al ID indicado. Responde con estado `200` si existe o `404` si no se encuentra.

Ejemplo:

```http
GET http://localhost:8080/api/services/1
```

### Crear un servicio

`POST /api/services`

Crea un nuevo servicio utilizando los datos enviados en el body. El ID se genera automáticamente. Responde con estado `201` si se crea correctamente o `400` si faltan campos obligatorios.

Ejemplo:

```http
POST http://localhost:8080/api/services
Content-Type: application/json

{
    "name": "Peinado",
    "description": "Servicio de peinado",
    "duration": 30,
    "price": 1100,
    "category": "peluqueria",
    "available": true
}
```

### Actualizar un servicio

`PUT /api/services/:id`

Actualiza los datos del servicio correspondiente al ID indicado. No permite modificar el ID. Responde con estado `200` si existe o `404` si no se encuentra.

Ejemplo:

```http
PUT http://localhost:8080/api/services/1
Content-Type: application/json

{
    "price": 1000,
    "available": true
}
```

### Eliminar un servicio

`DELETE /api/services/:id`

Elimina el servicio correspondiente al ID indicado. Responde con estado `200` si se elimina correctamente o `404` si no se encuentra.

Ejemplo:

```http
DELETE http://localhost:8080/api/services/1
```