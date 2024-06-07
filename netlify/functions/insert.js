const mysql = require("mysql2/promise");
const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use(express.json());

app.post("/api/insert", async (req, res) => {
  const { humidity, temperature, gas_level } = req.body;

  // Configuración del cliente de MySQL
  const connection = await mysql.createConnection({
    host: "bolruxyecypx1aopslow-mysql.services.clever-cloud.com",
    user: "urc25cuuwg0uzsbh",
    password: "d3UdGjs8QdZICM7NGruM",
    database: "bolruxyecypx1aopslow",
    port: 3306, // Asegúrate de que este puerto es correcto
  });

  try {
    // Consulta para insertar los datos
    const query = `
      INSERT INTO sensores (humidity, temperature, gas_level)
      VALUES (?, ?, ?);
    `;
    const values = [humidity, temperature, gas_level];

    const [result] = await connection.execute(query, values);
    console.log("Data inserted:", result);

    res.status(200).json({ message: "Data received and inserted" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

module.exports.handler = serverless(app);
