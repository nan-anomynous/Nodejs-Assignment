const express = require("express");

const app = express();

app.use(express.json());

const githubRoutes = require("./routes/githubRoutes");
app.use("/api", githubRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "GitHub Profile Analyzer API Running",
  });
});

module.exports = app;