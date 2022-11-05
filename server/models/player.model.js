const mongoose = require('mongoose');

const EsquemaPlayer = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, "Nombre obligatorio."],
        minlength: [2, "Nombre debe tener al menos 2 caracteres"]
    },
    posicion: {
        type: String,
        minlength: [3, "Posición debe tener al menos 3 caracteres"]
    },
    estado: {
        type: Array,
        required: [true, "Estados obligatorios"],
        default: ["undecided","undecided","undecided"]
    }
}, { timestamps: true, versionKey: false });
//timestamps crea campos de createdAt y updatedAt
//versionKey: false elimina el campo _v


const Player = mongoose.model("players", EsquemaPlayer);

module.exports = Player;