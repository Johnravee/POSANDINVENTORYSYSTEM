const express = require("express");
const queryMethods = require("../models/queryClass");
const router = express.Router();



router.get("/dashboard", async (req, res)=>{
    const [totalEmployee] = await queryMethods.getTotalEmployees();
    const userData = await req.session.userData;
    
    if(req.session.authenticated && userData && totalEmployee) res.render("admindashboard", {userData, totalEmployee});
        
       else res.redirect("login");

})

module.exports = router;