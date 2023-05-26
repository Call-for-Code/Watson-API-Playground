const express = require("express");
const cors = require("cors");

require("dotenv").config();

// Route files
const backendRoutes = require("./routes/backendRoute");

const app = express();

// Request Body Parser
app.use(express.json());

// Allow CORs
app.use(
  cors({
    origin: "*",
  })
);

// Default server route message
app.get("/", (req, res) => {
  res.send("Call for Code backend is running!");
});

app.post("/test", (req, res) => {
  res.send("This is working");
});

// Mount Routers
app.use("/v1/cfc", backendRoutes);

// Server Config
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(
  PORT,
  console.log(
    `Call for Code backend server is up and running in ${NODE_ENV} mode on port ${PORT}`
  )
);
