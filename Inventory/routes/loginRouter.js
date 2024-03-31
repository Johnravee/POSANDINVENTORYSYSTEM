const express = require("express");
const queryMethods = require("../models/queryClass");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Render login page
router.get("/login", (req, res) => {
    if(req.session.authenticated) res.redirect("dashboard");
    else res.render("login");
});

// Handle login POST request
router.post("/login", async (req, res) => {
    const { employeeId, employeePassword } = req.body;

    // Render login page if the authentication fails
    if (!employeeId || !employeePassword) {
        console.error("Invalid Credential!");
        return res.status(500).send("Invalid Credential!");
    }

    const userData = await queryMethods.selectQuery("company_accounts", "employee_id", employeeId, null);
    if (!userData || userData.length === 0) {
        console.error("User not found!");
        return res.status(500).send("User not found!");
    }

    const comparedPassword = await bcrypt.compare(employeePassword, userData[0].password);
    if (userData[0].employee_id === employeeId && comparedPassword) {
        req.session.authenticated = true;
        req.session.userData = {
            useraccountid: userData[0].id,
            userfullname: userData[0].fullname,
            useremail: userData[0].email,
            usercontact: userData[0].contact_number,
            userbirthdate: userData[0].dateofbirth,
            userjobposition: userData[0].job_position,
            useremployeeid: userData[0].employee_id,
            userinvoicenumber: userData[0].Invoice_number,
            useraddress: userData[0].address
        };  
        console.log(userData); 
        return res.redirect("/dashboard");
    } else {
        console.error("Invalid Credential!");
        return res.status(500).send("Invalid Credential!");
    }
});

module.exports = router;
