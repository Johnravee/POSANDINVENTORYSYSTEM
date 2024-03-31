const express = require("express");
const queryMethods = require("../models/queryClass");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/createaccount", (req, res)=>{
    const userData = req.session.userData;
    if(req.session.authenticated && userData){
        res.render("createaccount");
    }else res.redirect("login");

    
})


//Handle to insert account
router.post("/createaccount", async (req, res) => {

        const { firstName, middleName, lastName, email, employeeID, invoiceNumber, Contact, Birthdate, jobPosition, address, password } = req.body;
        const fullname = `${firstName} ${middleName} ${lastName}`;
        
        const hash_pass = await bcrypt.hash(password, 15);
        const isSuccess =  queryMethods.insertAccount([employeeID ,fullname, email, Contact, address, jobPosition, Birthdate, invoiceNumber, hash_pass]);
        
        if(isSuccess){
            console.log("Success creating account");
            return res.status(200).send("success") 
        }
        else{
            console.log("failed");
            return res.status(500).send("failed");
        }
       
        

   
});


module.exports = router;