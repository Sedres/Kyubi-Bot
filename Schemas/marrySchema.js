const mongoose = require("mongoose");

// Definir el esquema de matrimonio
const marriageSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // ID del usuario que propone matrimonio
    targetId: { type: String, required: true }, // ID del usuario objetivo
    accepted: { type: Boolean, default: false }, // Estado del matrimonio (aceptado o no)
});

// Crear el modelo de matrimonio basado en el esquema
module.exports = mongoose.model("Marriage", marriageSchema);
