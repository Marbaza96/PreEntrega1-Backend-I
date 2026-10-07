import fs from "fs/promises";

class ServiceManager {
    constructor() {
        this.path = "./src/data/services.json";
    }

    handleError(message, statusCode) {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }

    // Obtener todos los servicios
    async getServices(category, available) {

        try {
            const data = await fs.readFile(this.path, "utf-8");
            let services = JSON.parse(data);

            if (category) {
                services = services.filter((service) => service.category === category);
            }

            if (available !== undefined) {
                services = services.filter((service) => service.available === available);
            }
            return services;

        } catch (error) {

            if (error.code === "ENOENT") {
                await fs.writeFile(this.path, JSON.stringify([], null, 2));
                return [];
            }

            throw error;
        }
    }

    // Obtener un servicio por ID
    async getServiceById(id) {
        const services = await this.getServices();
        const service = services.find((service) => service.id === id);

        if (!service) {
            return null;
        }
        return service;
    }

    // Agregar un nuevo servicio
    async addService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        if (
            !name ||
            !description ||
            duration === undefined ||
            price === undefined ||
            !category ||
            available === undefined
        ) {
            throw this.handleError("Todos los campos son obligatorios", 400);
        }

        const services = await this.getServices();
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
        await fs.writeFile(this.path, JSON.stringify(services, null, 2));
        return newService;
    }

    // Actualizar un servicio existente
    async updateService(id, updatedData) {
        const services = await this.getServices();
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

        await fs.writeFile(this.path, JSON.stringify(services, null, 2));
        return services[index];
    }

    // Eliminar un servicio por ID
    async deleteService(id) {
        const services = await this.getServices();
        const serviceToDelete = services.find(service => service.id === id);

        if (!serviceToDelete) {
            return null;
        }

        const updatedServices = services.filter(service => service.id !== id);

        await fs.writeFile(this.path, JSON.stringify(updatedServices, null, 2));
        return serviceToDelete;
    }

}

export default ServiceManager;