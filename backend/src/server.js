require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configure your PostgreSQL connection
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT, // Default port 5432 if not specified in .env
});

console.log(pool);

// Enable CORS for all routes
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Define an Express route handler to execute the function
app.get("/parcelas", async (req, res) => {
  try {
    // Connect to the database
    const client = await pool.connect();
    // Execute the function
    const result = await client.query(
      "SELECT * FROM get_parcelas_with_svg_g2()"
    );
    // Release the client back to the pool
    client.release();
    // Send the result as JSON response
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching parcelas with SVG:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for horizontal cuts
app.get("/horizontal-cuts", async (req, res) => {
  try {
    const { geometry, cuts } = req.query;

    // Parse the cuts parameter as JSON
    const cutsArray = JSON.parse(cuts);

    const client = await pool.connect();
    const result = await client.query(
      `SELECT ST_Area(geom) AS area, geom, ST_AsSVG(geom) AS geom_svg
       FROM unnest(cortes_horizontales_g2($1, $2)) AS geom`,
      [geometry, cutsArray]
    );
    const { rows } = result;

    // Extract the areas and geometries from the rows
    const horizontalCuts = rows.map((row) => ({
      area: row.area,
      geom: row.geom,
      geom_svg: row.geom_svg
    }));

    res.json({ horizontalCuts });
    client.release();
  } catch (err) {
    console.error("Error executing horizontal cuts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for vertical cuts
app.get("/vertical-cuts", async (req, res) => {
  try {
    const { geometry, cuts } = req.query;

    // Parse the cuts parameter as JSON
    const cutsArray = JSON.parse(cuts);

    const client = await pool.connect();
    const result = await client.query(
      `SELECT ST_Area(geom) AS area, geom, ST_AsSVG(geom) AS geom_svg
      FROM unnest(cortes_verticales_g2($1, $2)) AS geom`,
      [geometry, cutsArray]
    );
    const { rows } = result;

    // Extract the areas and geometries from the rows
    const verticalCuts = rows.map((row) => ({
      area: row.area,
      geom: row.geom,
      geom_svg: row.geom_svg
    }));

    res.json({ verticalCuts });
    client.release();
  } catch (err) {
    console.error("Error executing vertical cuts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for grid cuts
app.get("/grid-cuts", async (req, res) => {
  try {
    const { geometry, cuts, cantidadxColumn } = req.query;

    // Parse the cuts parameter as JSON
    const cutsArray = JSON.parse(cuts);

    const client = await pool.connect();

    // Call the cortes_cuadricula function with the provided geometry
    const result = await client.query(
      `SELECT ST_Area(geom) AS area, geom, ST_AsSVG(geom) AS geom_svg
       FROM unnest(cortes_cuadricula_g2($1, $2, $3)) AS geom`,
      [geometry, cutsArray, cantidadxColumn]
    );

    const { rows } = result;

    // Convert area from string to number
    rows.forEach((row) => (row.area = parseFloat(row.area)));

    res.json({ gridCuts: rows });
    client.release();
  } catch (err) {
    console.error("Error executing grid cuts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for rotated cuts
app.get("/rotated-cuts", async (req, res) => {
  try {
    const { geometry, cuts, rotation } = req.query;

    // Parse the cuts parameter as JSON
    const cutsArray = JSON.parse(cuts);
    
    // Convert rotation to integer
    const rotationInteger = parseInt(rotation);

    const client = await pool.connect();
    const result = await client.query(
      `SELECT ST_Area(geom) AS area, geom, ST_AsSVG(geom) AS geom_svg
       FROM unnest(cortes_rotacion_g2($1, $2, $3)) AS geom`,
      [geometry, cutsArray, rotationInteger]
    );
    const { rows } = result;

    // Extract the areas and geometries from the rows
    const rotatedCuts = rows.map((row) => ({
      area: row.area,
      geom: row.geom,
      geom_svg: row.geom_svg
    }));

    res.json({ rotatedCuts });
    client.release();
  } catch (err) {
    console.error("Error executing rotated cuts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
