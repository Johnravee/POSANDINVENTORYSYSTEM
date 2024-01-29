const exp = require('constants');
const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.static(path.join(__dirname, 'node_modules')));
router.use(express.static(path.join(__dirname, '/', 'inventory', 'img')));

router.get("/Requests/logoutreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname,"/", "inventory","Requests", "logoutreq.js"))
})

router.get("/Requests/profilereq.js", (req, res)=>{
  res.sendFile(path.join(__dirname,  "/","inventory", "Requests", "profilereq.js"))
})

router.get("/Requests/loginreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname,  "/","inventory", "Requests", "loginreq.js"));
})

router.get("/Requests/administratorreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname,  "/","inventory", "Requests", "administratorreq.js"));
})

router.get("/Requests/employeesreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname,  "/","inventory", "Requests", "employeesreq.js"));
})

router.get("/javascript/adminProfile.js", (req, res)=>{
  res.sendFile(path.join(__dirname,  "/","inventory", "javascript", "adminProfile.js"));
})

router.get("/Requests/createaccountreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname,  "/","inventory", "Requests", "createaccountreq.js"));
})

router.get("/javascript/invoice&EmployeeIDGenerator.js", (req, res)=>{
  res.sendFile(path.join(__dirname,  "/","inventory", "javascript", "invoice&EmployeeIDGenerator.js"));
})

router.get("/javascript/employee&adminList.js", (req, res)=>{
  res.sendFile(path.join(__dirname,  "/","inventory", "javascript", "employee&adminList.js"));
})

router.get('/javascript/productList.js', (req, res) => {
  res.sendFile(path.join(__dirname,  '/',"inventory", 'javascript', 'productList.js'));
});

router.get('/Requests/productreq.js', (req, res) => {
  res.sendFile(path.join(__dirname,  '/',"inventory", 'Requests', 'productreq.js'));
});


// router.get("/views/javascript/productList.js", (req, res) => {
//   res.sendFile(path.join(__dirname,  '/',"POS", 'javascript', 'productList.js'));
// });


module.exports = router;
