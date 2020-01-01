const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/quiniela", { useUnifiedTopology: true, useNewUrlParser: true });

let jornadaSchema = new mongoose.Schema({
    jornada: Number,
    fechaInicio: Date,
    fechaCierre: Date,
    juego1L: String,
    juego1V: String,
    juego2L: String,
    juego2V: String,
    juego3L: String,
    juego3V: String,
    juego4L: String,
    juego4V: String,
    juego5L: String,
    juego5V: String,
    juego6L: String,
    juego6V: String,
    juego7L: String,
    juego7V: String,
    juego8L: String,
    juego8V: String,
    juego9L: String,
    juego9V: String
});


let Jornada = mongoose.model('Jornada', jornadaSchema);

module.exports.Jornada = Jornada;
