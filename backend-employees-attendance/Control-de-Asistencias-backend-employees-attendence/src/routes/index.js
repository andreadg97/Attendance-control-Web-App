const express = require("express");
const router = express.Router();
const moment = require("moment");
// Models
const Employee = require("../db/models/employee");
const Attendence = require("../db/models/attendence");

// User access to index page
router.get("/", async (req, res) => {
  if (req.session.userId) {
    switch (req.session.userType) {
      case "GERENTE":
        res.render("admin/indexAdmin");
        break;
      case "RH":
        res.render("rh/indexRH");
        break;
      case "EMPLEADO":
        {
          const employee = await Employee.findOne({
            folio: req.session.userId
          });
          const todaysDate = moment().format("YYYY-MM-DD");
          const tomorrowsDate = moment()
            .add(1, "d")
            .format("YYYY-MM-DD");
          // Search for todays employee attendence
          const usrAttendence = await Attendence.findOne({
            fecha: { $gte: todaysDate, $lte: tomorrowsDate },
            idEmpleado: employee
          });
          let attndcInfo = { default: null };
          if (usrAttendence) attndcInfo.checked = true;
          else {
            console.log("No registrada...");
            // Attendence haven't been checked

            // Check if is on work time
            if (
              moment().isSameOrAfter(
                moment(todaysDate +" "+ employee.horaEntrada + ":00")
              ) &&
              moment().isBefore(
                moment(todaysDate +" "+ employee.horaSalida + ":00")
              )
            ) {
              // Is on work time

              // Check if is on time < 10 minutes
              if (
                moment().isBefore(
                  moment(todaysDate +" "+ employee.horaEntrada + ":00").add(10, "m")
                )
              ) {
                // Is on time
                attndcInfo.onTime = true;
              } else {
                // Is on work time but delayed
                attndcInfo.delayed = true;
              }
            } else {
              console.log("No está a tiempo...");
              // Is not on work time
              attndcInfo.noWorkTime = true;
            }
          }
          res.render("employee/indexEmployee", { attndcInfo });
        }
        break;
    }
  } else {
    res.redirect("login");
  }
});

// User access to login url
router.get("/login", (req, res) => {
  if (req.session.userId) res.redirect("/");
  else {
    const tempCredentiasl = req.session.userCredentials
      ? req.session.userCredentials
      : {};
    delete req.session.userCredentials;
    res.render("loginPage", { userCredentials: tempCredentiasl });
  }
});

// Reciving login credentials
router.post("/login", async (req, res) => {
  const { folio, psw } = req.body;
  onlyDigits = /^\d+$/.test(folio);
  if (onlyDigits) {
    const employee = await Employee.findOne({ folio: folio });
    if (employee) {
      if (await employee.matchPassword(psw)) {
        req.session.userId = folio;
        req.session.userType = employee.puesto;
        res.redirect("/");
      } else {
        res.flash("error_msg", "La contraseña ingresada no es correcta.");
        req.session.userCredentials = req.body;
        res.redirect("/login");
      }
    } else {
      res.flash("error_msg", "Ingrese un folio válido.");
      req.session.userCredentials = req.body;
      res.redirect("/login");
    }
  } else {
    res.flash("error_msg", "Ingrese un folio válido.");
    req.session.userCredentials = req.body;
    res.redirect("/login");
  }
});

// When user wants to logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
