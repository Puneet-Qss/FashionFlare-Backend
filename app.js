const express = require("express");
const app = express();
const port = 5000;

var cors = require("cors");
app.use(cors());

const connectDB = require("./db/connection");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes/Products");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);

// admin Routes

app.use("/admin", adminRoutes);

// ROUTES

// SERVER
app.listen(port, () => {
  console.log("SERVER IS RUNNING ON THE PORT", port);
});
