import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

if (!PORT) {
    throw new Error("La variable PORT es obligatoria");
}

if (!NODE_ENV) {
    throw new Error("La variable NODE_ENV es obligatoria");
}

export { PORT, NODE_ENV };