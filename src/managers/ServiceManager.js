import fs from "fs";

class ServiceManager {
    constructor() {
        this.path = "./src/data/services.json";
    }

    // Obtener todos los servicios
    getServices() {
        const data = fs.readFileSync(this.path, "utf-8");
        return JSON.parse(data);
    }

    // Obtener un servicio por ID
    getServiceById(id) {
        const services = this.getServices();
        const service = services.find((service) => service.id === id);

        if (!service) {
            return null;
        }
        return service;
    }

    // Agregar un nuevo servicio
    addService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        if (
            !name ||
            !description ||
            duration === undefined ||
            price === undefined ||
            !category ||
            available === undefined
        ) {
            throw new Error("Todos los campos son obligatorios");
        }
        const services = this.getServices();
        let newId = 1;
        if (services.length > 0) {
            const ids = services.map((service) => service.id);
            const maxId = Math.max(...ids);
            newId = maxId + 1;
        }

        const newService = {
            id: newId,
            name,
            description,
            duration,
            price,
            category,
            available
        };

        services.push(newService);
        fs.writeFileSync(this.path, JSON.stringify(services, null, 2));
        return newService;
    }

    // Actualizar un servicio existente
    updateService(id, updatedData) {
        const services = this.getServices();
        const index = services.findIndex((service) => service.id === id);
        
        if (index === -1) {
            return null;
        }

        const safeData = { ...updatedData };
        delete safeData.id;

        services[index] = {
            ...services[index],
            ...safeData
        };

        fs.writeFileSync(this.path, JSON.stringify(services, null, 2));
        return services[index];
    }

    // Eliminar un servicio por ID
    deleteService(id) {
        const services = this.getServices();
        const serviceToDelete = services.find(service => service.id === id);

        if (!serviceToDelete) {
            return null;
        }

        const updatedServices = services.filter(service => service.id !== id);

        fs.writeFileSync(this.path, JSON.stringify(updatedServices, null, 2));
        return serviceToDelete;
    }

}

export default ServiceManager;