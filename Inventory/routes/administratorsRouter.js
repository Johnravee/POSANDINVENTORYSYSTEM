const express = require("express");
const queryMethods = require("../models/queryClass");
const router = express.Router();

// Handle rendering adminlist page
router.get("/administrators", async(req, res)=>{
     try {
        const userData = req.session.userData;
        if(req.session.authenticated && userData){
            const datas = await queryMethods.selectQuery("company_accounts", "job_position","Administrator", false);
            res.render("administratorList", {administrators: datas})
        }else res.redirect("login");
        

        
    } catch (error) {
        console.error("Request Failed! gage", error);
        return res.status(500).send("gettingdataerror");
    }
})


// Handle put/changes request
router.put("/administrators", (req, res)=>{
    try {
    const formdata = req.body;
    const isUpdated = queryMethods.updateAdministratorInfo(formdata);
    console.log(isUpdated);
    if(isUpdated){
        res.status(200).send("Information updated successfully");
    }else{
        res.status(500).send("Information updated Failed");
    }
    } catch (error) {
        console.error(error);
    }
    
})


// Handle delete request
router.delete("/administrators", (req, res)=>{
    const { administratorId } = req.body;
    const isDeleted = queryMethods.deleteQuery("company_accounts", administratorId);

    if(isDeleted){
        res.status(200).send("Delete successfully");
    }else{
        res.status(500).send("Deleting  Failed");
    }
    
})

module.exports = router;