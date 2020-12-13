const moongose = require('mongoose');
const Employee = require("../db/models/employee");
const Attendence = require("../db/models/attendence");
const moment = require('moment');

console.log(Date.now().toLocaleString());
moongose.connect('mongodb://localhost/sys-asistencias', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("[*] Db connected."))
    .catch(err => console.log("[ERROR] Db connection unsuccessfully."));
  console.log(moment(Date.now()).format("HH:mm:ss"));

// Employee.findOne({ folio: 2 },(err, doc) => {

//     if (err) {

//         console.log("No se encontró")

//     } else {

//         console.log("Se encontró")

//         const idEmpleado = doc;

//         const attendence = new Attendence({
//             idEmpleado,
//             checkIn: "",
//             type: "1",
//         })

//         attendence.save((err, doc) => {
//             if (err) {

//                 console.log("No se guardó la asistencia")

//             } else {

//                 console.log("Se guardó correctamente la asistencia")

//             }

//         });

//     }

// });


