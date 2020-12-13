const moongose = require('mongoose');
const Employee = require("../db/models/employee");
const Attendence = require("../db/models/attendence");

moongose.connect('mongodb://localhost/sys-asistencias', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("[*] Db connected."))
    .catch(err => console.log("[ERROR] Db connection unsuccessfully."));

const empleado = new Employee({
    nombre: "José",
    puesto: "supervisor",
    direccion: "lucerna",
    telefono: "6681688008",
    fechaNacimiento: "",
    correo: "correo@gmail.com",
    rfc: "rcf123",
    fechaContrato: "",
    horaEntrada: "",
    horaSalida: "",
    semanatrabajo: "",
    vacacionesDisponibles: "6",
    diasLibres: "8",
    psw: "123"
})


empleado.save((err, doc) => {

    if (err) {

        console.log("No se guardó")

    } else {

        console.log("Se guardó correctamente")

        const idEmpleado = doc;

        const attendence = new Attendence({
            idEmpleado,
            checkIn: "",
            type: "1",
        })

        attendence.save((err, doc) => {
            if (err) {

                console.log("No se guardó la asistencia")

            } else {

                console.log("Se guardó correctamente la asistencia")

            }

        });

    }

});


