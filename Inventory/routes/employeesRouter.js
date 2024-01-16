const express = require("express");
const queryMethods = require("../models/queryClass");
const router = express.Router();

router.get("/employees", async(req, res)=>{

    try {
        const userData = req.session.userData;
        if(req.session.authenticated && userData){
            const datas = await queryMethods.selectQuery("company_accounts", "job_position","'Cashier', 'Accountant', 'Store Manager', 'Head Manager'", true);
        res.render("employeeLists", {employees: datas});
        }else res.redirect("login");
        
        
    } catch (error) {
        console.error("Request Failed! gage", error);
        return res.status(500).send("gettingdataerror");
    }


})


// Handle Update req
router.put("/employees", (req, res)=>{
    const formdata = req.body;
    const isUpdated = queryMethods.updateEmployeeInfo(formdata);
    if(isUpdated){
        res.status(200).send("Information updated successfully");
    }else{
        res.status(500).send("Information updated Failed");
    }
})


// Handle delete request
router.delete("/employees", (req, res)=>{
    const {accountid} = req.body;
    const isDeleted = queryMethods.deleteQuery("company_accounts", accountid);

    if(isDeleted){
        res.status(200).send("Delete successfully");
    }else{
        res.status(500).send("Deleting  Failed");
    }
})


module.exports = router;