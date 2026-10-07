# API de Servicios y Reservas

Proyecto desarrollado en Node.js para gestionar servicios y reservas de un sistema de turnos mediante una API REST con Express y persistencia de datos en archivos JSON utilizando FileSystem.

## Instalación

Clonar el repositorio e instalar las dependencias:

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

```env
PORT=8080
NODE_ENV=development
```

## Recursos

### Services

Cada servicio contiene las siguientes propiedades:

- `id`
- `name`
- `description`
- `duration`
- `price`
- `category`
- `available`

### Bookings

Cada reserva contiene las siguientes propiedades:

- `id`
- `clientName`
- `clientEmail`
- `date`
- `time`
- `status`
- `services`

Los servicios asociados a una reserva se almacenan mediante su ID y cantidad:

```json
{
    "service": 1,
    "quantity": 1
}
```

## API REST

### Services

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:id` | Obtener un servicio por ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:id` | Actualizar un servicio |
| DELETE | `/api/services/:id` | Eliminar un servicio |

El listado de servicios permite filtrar mediante los query params `category` y `available`.

### Ejemplos de peticiones HTTP

Obtener todos los servicios:

```http
GET http://localhost:8080/api/services
```

Obtener servicios filtrados:

```http
GET http://localhost:8080/api/services?category=peluqueria&available=true
```

Crear un servicio:

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

### Bookings

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/bookings` | Obtener todas las reservas |
| GET | `/api/bookings/:bid` | Obtener una reserva por ID |
| POST | `/api/bookings` | Crear una reserva |
| PUT | `/api/bookings/:id` | Actualizar una reserva |
| POST | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |
| DELETE | `/api/bookings/:id` | Eliminar una reserva |

### Ejemplos de peticiones HTTP

Obtener todas las reservas:

```http
GET http://localhost:8080/api/bookings
```

Crear una reserva:

```http
POST http://localhost:8080/api/bookings
Content-Type: application/json

{
    "clientName": "Cliente Prueba",
    "clientEmail": "cliente@email.com",
    "date": "2026-10-15",
    "time": "10:00",
    "status": "pendiente"
}
```

Obtener una reserva por ID:

```http
GET http://localhost:8080/api/bookings/1
```

Agregar un servicio a una reserva:

```http
POST http://localhost:8080/api/bookings/1/services/1
```