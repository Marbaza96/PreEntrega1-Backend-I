import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";

const router = Router();
const serviceManager = new ServiceManager();


// Obtener todos los servicios con filtros opcionales
router.get("/", async (req, res) => {

    try {
        const { category, available } = req.query;
        const availableBoolean = available !== undefined
            ? available === "true"
            : undefined;

        const services = await serviceManager.getServices(category, availableBoolean);

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Servicio por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const numericId = Number(id);

        const service = await serviceManager.getServiceById(numericId);

        if (!service) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }

        res.status(200).json(service);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Agregar un nuevo servicio
router.post("/", async (req, res) => {

    try {
        const createdService = await serviceManager.addService(req.body);
        res.status(201).json(createdService);
    }

    catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }

});

// Actualizar un servicio existente
router.put("/:id", async (req, res) => {

    try {
        const { id } = req.params;
    const numericId = Number(id);

    const updatedService = await serviceManager.updateService(numericId, req.body);

    if (!updatedService) {
        return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(updatedService);

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }    
});

// Eliminar un servicio por ID
router.delete("/:id", async (req, res) => {

    try {
        const { id } = req.params;
    const numericId = Number(id);

    const deletedService = await serviceManager.deleteService(numericId);

    if (!deletedService) {
        return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(deletedService);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }    
});

export default router;