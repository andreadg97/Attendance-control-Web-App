const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    nombre: String,
    puesto: String,
    direccion: String,
    telefono: String,
    fechaNacimiento: Date,
    correo: String,
    rfc: String,
    horaEntrada: String,
    horaSalida:String,
    semanaTrabajo: [Boolean],
    echaContrato: Date,
    vacacionesDisponibles: Number,
    diasLibres: Number,
    psw: { type: String, required: true },
    fechaRegistro: {type: Date, default: Date.now()},
});
employeeSchema.plugin(AutoIncrement, {inc_field: 'folio'});
employeeSchema.methods.encryptPassword = async (psw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(psw, salt);
    return hash;
  };
  employeeSchema.methods.matchPassword = async function (psw) {
    return await bcrypt.compare(psw, this.psw);
  };
module.exports = mongoose.model('Employee',employeeSchema);