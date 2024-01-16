const express = require("express");
const router = express.Router();
const session = require("express-session");

router.all("/logout", (req, res)=>{
    req.session.destroy((err)=>{
        if (err) {
             console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        } else {
            console.log("redirected to login");
          return res.status(200).send("logout done!");
        }
    })
})

module.exports = router;