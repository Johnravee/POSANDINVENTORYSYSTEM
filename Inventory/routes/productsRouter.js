const express = require("express");
const queryMethods = require("../models/queryClass");
const router = express.Router();
const multer = require("multer");
const upload = multer();

// Handle rending product page
router.get("/products", async (req, res) => {
    try {
    const userData = req.session.userData;
        if(req.session.authenticated && userData){
            const datas = await queryMethods.selectQuery("pos_products", "*", null, null);
            res.render("products", {product: datas})
        }else res.redirect("login");
        
        
    } catch (error) {
        console.error("Request Failed!", error);
        return res.status(500).send("gettingdataerror");
    }
});



// Handle new product request
router.post("/products", upload.single("imageFileData"), (req, res)=>{
    try{
        const imageFileData = req.file.buffer;
        const {productName, Categories, stocks, price } = req.body;
        
        const isSuccess = queryMethods.insertProduct([productName, price, imageFileData, stocks, Categories]);
        if(isSuccess){
            console.log("Success");
            return res.status(200).send("success") 
        }
        else{
            console.log("failed");
            return res.status(500).send("failed");
        }
    }catch(error){
        console.error("Error", error);
    }
})

// Handle updating request product details 
router.put("/products", (req, res)=>{
    const {productPrice, productStocks, productID} = req.body;
    const isUpdated = queryMethods.updateProductPriceANDStocks(productPrice, productStocks, productID);
    if(isUpdated){
        res.status(200).send("Price and Stocks updated successfully");
    }else{
        res.status(500).send("Price and Stocks updated Failed");
    }
})





// Handle product delete request
router.delete("/products", (req, res)=>{
    const { productid } = req.body;
    const isDeleted = queryMethods.deleteQuery("pos_products", productid);

    if(isDeleted){
        res.status(200).send("Delete successfully");
    }else{
        res.status(500).send("Deleting  Failed");
    }
    
})





module.exports = router;