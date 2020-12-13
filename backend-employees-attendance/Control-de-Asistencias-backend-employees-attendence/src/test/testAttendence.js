const moongose = require('mongoose');
const Employee = require("../db/models/employee");
const Attendence = require("../db/models/attendence");
const moment = require('moment');
const fecha = moment("2019-11-06 05:51:00").format('YYYY-MM-DD HH:mm:ss');
const fecha2 = moment(fecha).format('YYYY-MM-DD HH:mm:ss');
console.log(fecha);
console.log(fecha2);
// moongose.connect('mongodb://localhost/sys-asistencias', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(db => console.log("[*] Db connected."))
//     .catch(err => console.log("[ERROR] Db connection unsuccessfully."));

//     const employee = Employee.findOne();


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


