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

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../../frontend")));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});