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
        // Needs to redirect
        res.render("admin/indexAdmin");
        break;
      case "RH":
        //Needs to redirect
        res.render("rh/indexRH");
        break;
      case "EMPLEADO":
          res.redirect("/empleado")
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
