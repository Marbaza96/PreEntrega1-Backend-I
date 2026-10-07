import fs from "fs/promises";

class BookingManager {
    constructor() {
        this.path = "./src/data/bookings.json";
    }

    handleError(message, statusCode) {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }

    async getBookings() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);

        } catch (error) {
            if (error.code === "ENOENT") {
                await fs.writeFile(this.path, JSON.stringify([], null, 2));
                return [];
            }

            throw error;
        }
    }

    // Obtener una reserva por ID
    async getBookingById(id) {
        const bookings = await this.getBookings();
        const booking = bookings.find((booking) => booking.id === id);

        if (!booking) {
            return null;
        }

        return booking;
    }

    // Crear una nueva reserva
    async createBooking(bookingData) {
        const { clientName, clientEmail, date, time, status, services = [] } = bookingData;

        if (
            !clientName ||
            !clientEmail ||
            !date ||
            !time ||
            !status
        ) {
            throw this.handleError("Todos los campos son obligatorios", 400);
        }

        const bookings = await this.getBookings();

        let newId = 1;

        if (bookings.length > 0) {
            const ids = bookings.map((booking) => booking.id);
            const maxId = Math.max(...ids);
            newId = maxId + 1;
        }

        const newBooking = {
            id: newId,
            clientName,
            clientEmail,
            date,
            time,
            status,
            services
        };

        bookings.push(newBooking);
        await fs.writeFile(this.path, JSON.stringify(bookings, null, 2));
        return newBooking;
    }

    // Agregar un servicio a una reserva
    async addServiceToBooking(bookingId, service) {
        const bookings = await this.getBookings();
        const booking = bookings.find((booking) => booking.id === bookingId);

        if (!booking) {
            throw this.handleError("Reserva no encontrada", 404);
        }

        const existingService = booking.services.find((item) => item.service === service.id);
        if (existingService) {
            existingService.quantity += 1;
        }
        else {
            booking.services.push({
                service: service.id,
                quantity: 1
            });
        }

        await fs.writeFile(this.path, JSON.stringify(bookings, null, 2));
        return booking;
    }


    // Actualizar una reserva existente
    async updateBooking(id, updatedData) {
        const bookings = await this.getBookings();
        const index = bookings.findIndex((booking) => booking.id === id);

        if (index === -1) {
            throw this.handleError("Reserva no encontrada", 404);
        }

        const safeData = { ...updatedData };
        delete safeData.id;

        bookings[index] = {
            ...bookings[index],
            ...safeData
        };

        await fs.writeFile(this.path, JSON.stringify(bookings, null, 2));
        return bookings[index];
    }

    // Eliminar una reserva por ID
    async deleteBooking(id) {
        const bookings = await this.getBookings();
        const bookingToDelete = bookings.find(booking => booking.id === id);

        if (!bookingToDelete) {
            throw this.handleError("Reserva no encontrada", 404);
        }

        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        await fs.writeFile(this.path, JSON.stringify(updatedBookings, null, 2));
        return bookingToDelete;
    }

}


export default BookingManager;
