const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use(express.json());

app.post("/api/insert", (req, res) => {
  const { humidity, temperature, gas_level } = req.body;
  console.log(
    `Humidity: ${humidity}, Temperature: ${temperature}, Gas Level: ${gas_level}`
  );
  res.send("Data received");
});

module.exports.handler = serverless(app);
