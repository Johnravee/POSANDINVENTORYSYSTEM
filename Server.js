const administratorsRouter = require("./Inventory/routes/administratorsRouter");
const loginRouter = require("./Inventory/routes/loginRouter");
const dashboardRouter = require("./Inventory/routes/dashboardRouter");
const createaccountRouter = require("./Inventory/routes/createaccountRouter");
const profileRouter = require("./Inventory/routes/profileRouter")
const employeesRouter = require("./Inventory/routes/employeesRouter");  
const staticfiles = require("./servestaticfiles");
const productsRouter = require("./Inventory/routes/productsRouter");
const logoutRouter = require("./Inventory/routes/logoutRouter");
const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");


const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());


//Serve static files
app.use(staticfiles);

// Views/pages hehe
app.set('views', path.join(__dirname, '/', 'inventory','views'));
app.set("view engine", "ejs");

app.use(session({
  secret: "only god knows",
  saveUninitialized: false,
  resave: false,
  cookie : {
    maxAge : 24 * 60 * 60 * 1000,
    sameSite: "lax",
    secure: false, 
  }
}));





// routers
app.use("/", loginRouter);
app.use("/", dashboardRouter);
app.use("/",profileRouter);
app.use("/", createaccountRouter);
app.use("/",employeesRouter);
app.use("/", administratorsRouter);
app.use("/", productsRouter);
app.use("/", logoutRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
