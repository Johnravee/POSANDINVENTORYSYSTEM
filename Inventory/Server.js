const administratorsRouter = require("./routes/administratorsRouter");
const loginRouter = require("./routes/loginRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const createaccountRouter = require("./routes/createaccountRouter");
const profileRouter = require("./routes/profileRouter")
const jsfilesmodule = require("./routes/jsfilesrouter");
const employeesRouter = require("./routes/employeesRouter");  
const staticfiles = require("./routes/staticfilesrouter");
const productsRouter = require("./routes/productsRouter");
const logoutRouter = require("./routes/logoutRouter");
const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");


const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
// use specific middleware gage
app.use(staticfiles);
app.use(jsfilesmodule);
// Views/pages hehe
app.set('views', path.join(__dirname, 'views'));
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
