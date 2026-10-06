import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";

const router = Router();
const serviceManager = new ServiceManager();


// Obtener todos los servicios con filtros opcionales
router.get("/", (req, res) => {
    const { category, available } = req.query;
    const availableBoolean = available !== undefined
        ? available === "true"
        : undefined;

    const services = serviceManager.getServices(category, availableBoolean);

    res.status(200).json(services);
});

//Servicio por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const numericId = Number(id);

    const service = serviceManager.getServiceById(numericId);

    if (!service) {
        return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(service);
});

// Agregar un nuevo servicio
router.post("/", (req, res) => {

    try {
        const createdService = serviceManager.addService(req.body);
        res.status(201).json(createdService);
    }

    catch (error) {
        res.status(400).json({ error: error.message });
    }
    
});

// Actualizar un servicio existente
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const numericId = Number(id);

    const updatedService = serviceManager.updateService(numericId, req.body);

    if (!updatedService) {
        return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(updatedService);

});

// Eliminar un servicio por ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const numericId = Number(id);

    const deletedService = serviceManager.deleteService(numericId);

    if (!deletedService) {
        return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(deletedService);
});

export default router;