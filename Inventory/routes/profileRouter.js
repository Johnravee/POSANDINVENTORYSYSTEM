const express = require("express");
const queryMethods = require("../models/queryClass");
const router = express.Router();

router.get("/profile", (req, res)=>{
        const userData = req.session.userData;
        if(req.session.authenticated && userData)  res.render("adminProfile", {userData});
        else res.redirect("login");
})

// Handle profile update request
router.put("/profile", (req, res)=>{
        const formdata = req.body;
        const userData = req.session.userData;
        const isUpdated = queryMethods.updateProfile(formdata);
       
        if(isUpdated){
                 userData.userfullname = formdata.modalFullname;
                userData.useremail = formdata.modalEmail;
                userData.usercontact = formdata.modalContact;
                userData.userbirthdate = formdata.modalBirthdate;
                userData.useraddress = formdata.address;

                
                res.status(200).send("updated")
        }else{
                res.status(500).send("Updating failed!");
        }
})

module.exports = router;