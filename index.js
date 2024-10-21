import express from "express";
import session from "express-session";
import { sequelize } from "./models/model.js";
import userRoutes from "./models/routers/user.js";
import User from "./models/users.js";

const app = express();
const port = 3000;

app.use(
  session({
    secret: "Ini adalah kode secret###",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
app.use(express.static("views"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("views/js/model"));
app.set("view engine", "ejs");

app.use("/", [userRoutes]);

app.get("/", (req, res) => {
  // let result = await User.findOne({where: {email: req.body.email}})
  res.render("home", { user: req.session.user });
});

app.get("/connect", (req, res) => {
  try {
    sequelize.authenticate();
    res.end("Connected");
  } catch (err) {
    res.end("Disconnected");
  }
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
