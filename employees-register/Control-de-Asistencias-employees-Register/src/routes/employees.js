const express = require("express");
const router = express.Router();
const passport = require("passport");
// Models
const Employee = require("../db/models/employee");
// Route for getting employees
router.get("/empleados", async (req, res) => {
  const employees = await Employee.find();
  res.render("admin/employeesList", {
    employees
  });
});

// User wants to register an employee
router.get("/empleados/registrar", (req, res) => {
  if(req.session.datos){
    const datosTemp = req.session.datos;
    delete req.session.datos;
    res.render("admin/registerEmployee", {datos:datosTemp});
  }
  else{
    res.render("admin/registerEmployee", { datos:{} });
  }
});

// Reciving new employee information to register
router.post("/empleados/registrar", async (req, res) => {
  const{
    nombre,
    puesto,
    direccion,
    telefono,
    fechaNacimiento,
    correo,
    rfc,
    fechaContrato,
    horaEntrada,
    horaSalida,
    lunes,
    martes,
    miercoles,
    jueves,
    viernes,
    sabado,
    domingo,
    vacacionesDisponibles,
    diasLibres,
    psw
  } = req.body;
  let semanaTrabajo=[];

  semanaTrabajo.push(lunes==null ? false: true);
  semanaTrabajo.push(martes==null  ? false: true);
  semanaTrabajo.push(miercoles==null ? false: true);
  semanaTrabajo.push(jueves==null ? false: true);
  semanaTrabajo.push(viernes==null ? false: true);
  semanaTrabajo.push(sabado==null ? false: true);
  semanaTrabajo.push(domingo==null? false: true);
  // Look for existing email
  
  const emailEmployee = await Employee.findOne({ correo: correo });
  
  if (emailEmployee) {
    let tempDatos = req.body;
    tempDatos.semanaTrabajo = semanaTrabajo;
    req.session.datos = tempDatos;
    res.flash("error_msg", `El correo ${correo} ya se encuentra registrado.`);
    res.redirect("registrar");
  } else {
    // Saving employee
    const newEmployee = new Employee({
        nombre,
        puesto,
        direccion,
        telefono,
        fechaNacimiento,
        correo,
        rfc,
        fechaContrato,
        horaEntrada,
        horaSalida,
        semanaTrabajo,
        vacacionesDisponibles,
        diasLibres,
    });
    newEmployee.psw = await newEmployee.encryptPassword(psw);
    await newEmployee.save((err, doc) => {
      if (err) {
        let tempDatos = req.body;
    tempDatos.semanaTrabajo = semanaTrabajo;
    req.session.datos = tempDatos;
        res.flash(
          "error_msg",
          "Ocurrió un error al registrar al Empleado. Intente de nuevo."
        );
        res.redirect("registrar");
        console.error(err);
        return false;
      } else {
        delete req.session.datos;
        res.flash("success_msg", "¡Empleado registrado correctamente!");
        res.redirect("../empleados");
        console.log("[*] Employee saved.");
        return true;
      }
    });
  }
});
module.exports = router;
