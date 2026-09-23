
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