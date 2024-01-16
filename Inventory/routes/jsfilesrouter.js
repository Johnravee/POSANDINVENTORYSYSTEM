const express = require('express');
const path = require('path');
const router = express.Router();

router.get("/Requests/logoutreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname,".." ,"/", "Requests", "logoutreq.js"))
})

router.get("/Requests/profilereq.js", (req, res)=>{
  res.sendFile(path.join(__dirname, ".." , "/", "Requests", "profilereq.js"))
})

router.get("/Requests/loginreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname, ".." , "/", "Requests", "loginreq.js"));
})

router.get("/Requests/administratorreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname, ".." , "/", "Requests", "administratorreq.js"));
})

router.get("/Requests/employeesreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname, ".." , "/", "Requests", "employeesreq.js"));
})

router.get("/javascript/adminProfile.js", (req, res)=>{
  res.sendFile(path.join(__dirname, ".." , "/", "javascript", "adminProfile.js"));
})

router.get("/Requests/createaccountreq.js", (req, res)=>{
  res.sendFile(path.join(__dirname, ".." , "/", "Requests", "createaccountreq.js"));
})

router.get("/javascript/invoice&EmployeeIDGenerator.js", (req, res)=>{
  res.sendFile(path.join(__dirname, ".." , "/", "javascript", "invoice&EmployeeIDGenerator.js"));
})

router.get("/javascript/employee&adminList.js", (req, res)=>{
  res.sendFile(path.join(__dirname, ".." , "/", "javascript", "employee&adminList.js"));
})

router.get('/javascript/productList.js', (req, res) => {
  res.sendFile(path.join(__dirname, ".." , '/', 'javascript', 'productList.js'));
});

router.get('/Requests/productreq.js', (req, res) => {
  res.sendFile(path.join(__dirname, ".." , '/', 'Requests', 'productreq.js'));
});

module.exports = router;
