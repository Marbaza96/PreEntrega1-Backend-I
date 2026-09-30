
# Administrador de Servicios

Proyecto desarrollado en Node.js para gestionar servicios de un sistema de turnos y reservas. Permite consultar, agregar, actualizar y eliminar servicios mediante la clase `ServiceManager`.

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

## Ejemplos de uso

Primero se debe importar e instanciar la clase `ServiceManager`:

```js
import ServiceManager from "./src/managers/ServiceManager.js";

const serviceManager = new ServiceManager();
```

### Obtener todos los servicios

```js
serviceManager.getServices();
```

### Obtener un servicio por ID

```js
serviceManager.getServiceById(1);
```

### Agregar un servicio

```js
serviceManager.addService({
    name: "Manicura",
    description: "Manicura tradicional",
    duration: 45,
    price: 700,
    category: "Estética",
    available: true
});
```

### Actualizar un servicio

```js
serviceManager.updateService(1, {
    price: 900,
    available: false
});
```

### Eliminar un servicio

```js
serviceManager.deleteService(1);
```
----------------------------------------------------------------------------------------

## API REST

La aplicación expone endpoints REST para gestionar el recurso `services` mediante Express.

### Obtener todos los servicios

`GET /api/services`

Devuelve todos los servicios disponibles. Permite filtrar por categoría y disponibilidad mediante query params.

### Obtener un servicio por ID

`GET /api/services/:id`

Devuelve el servicio correspondiente al ID indicado. Responde con estado `200` si existe o `404` si no se encuentra.

### Crear un servicio

`POST /api/services`

Crea un nuevo servicio utilizando los datos enviados en el body. El ID se genera automáticamente. Responde con estado `201` si se crea correctamente o `400` si faltan campos obligatorios.

### Actualizar un servicio

`PUT /api/services/:id`

Actualiza los datos del servicio correspondiente al ID indicado. No permite modificar el ID. Responde con estado `200` si existe o `404` si no se encuentra.

### Eliminar un servicio

`DELETE /api/services/:id`

Elimina el servicio correspondiente al ID indicado. Responde con estado `200` si se elimina correctamente o `404` si no se encuentra.