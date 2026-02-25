require("dotenv").config();
const express = require("express");
const cors = require("cors");

const venuesRoutes = require("./routes/venues");

const app = express();
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes properly (THIS is where /api/venues is defined)
app.use("/api/venues", venuesRoutes);

app.use(express.static(path.join(__dirname, "../../frontend")));

app.listen(3001, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3001, frontend http://localhost:3000");
});