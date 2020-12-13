const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assistenceSchema = new Schema({
  idEmpleado: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
  fecha: { type: Date, default: Date.now()},
  type: Number,
});

module.exports = mongoose.model("attendence", assistenceSchema);

