import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1234",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const truncateVisitedCountries = async () => {
  try {
    await db.query("TRUNCATE TABLE visited_countries");
    console.log("Visited countries table truncated.");
  } catch (err) {
    console.error("Error truncating visited countries table:", err);
  }
};

// Call the function on server startup to clear the table
truncateVisitedCountries();

app.get("/", async (req, res) => {
  try {
    const visited_country = await db.query("SELECT country_code FROM visited_countries");
    let country = [];
    visited_country.rows.forEach((code) => country.push(code.country_code));
    res.render("index.ejs", { countries: country, total: country.length });
  } catch (err) {
    console.error("Error fetching visited countries:", err);
    res.status(500).send("Error fetching visited countries.");
  }
});

app.post("/add", async (req, res) => {
  try {
    const country_name = req.body.country.toLowerCase();
    console.log(country_name);

    const country_code = await db.query(
      `SELECT country_code FROM countries WHERE LOWER(country_name) = $1`,
      [country_name] // Convert to lowercase for case-insensitive match
    );

    if (country_code.rows.length > 0) {
      const country_code_value = country_code.rows[0].country_code.trim();
      await db.query(
        `INSERT INTO visited_countries(country_code, country_name) VALUES($1, $2)`,
        [country_code_value, country_name]
      );
      res.redirect("/");
    } else {
      console.error("Country not found in the database.");
      res.status(404).send("Country not found.");
    }
  } catch (err) {
    console.error("Error adding country:", err);
    res.status(500).send("Error adding country.");
  }
});

// Get route for displaying the visited countries
/*const truncateVisitedCountries = async () => {
  try {
    await db.query("TRUNCATE TABLE visited_countries");
    console.log("Visited countries table truncated.");
  } catch (err) {
    console.error("Error truncating visited countries table:", err);
  }
};

// Call the function on server startup to clear the table
truncateVisitedCountries();
app.get("/", async (req, res) => {
  try {
    const visited_countries = await db.query("SELECT country_code FROM visited_countries");
    let countries = visited_countries.rows.map(row => row.country_code);

    res.render("index.ejs", { countries: countries, total: countries.length });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Post route for adding a country
app.post("/add", async (req, res) => {
  // Normalize the input
  const country_name = req.body.country.trim().toLowerCase();
  
  try {
    // Log the normalized country name
    console.log("User input country name:", country_name);

    // 1. Check if the country name exists in the countries table
    const result = await db.query(`SELECT country_code FROM countries WHERE LOWER(country_name) = $1`, [country_name]);

    if (result.rows.length > 0) {
      const country_code = result.rows[0].country_code;

      // Log the country_code to verify it is correct
      console.log("Country Code:", country_code);

      // 2. Insert the country code into the visited_countries table if it is a valid string
      if (typeof country_code === "string") {
        await db.query(`INSERT INTO visited_countries (country_code) VALUES ($1)`, [country_code]);

        // 3. Get the updated list of visited countries
        const visited_countries = await db.query("SELECT country_code FROM visited_countries");
        let countries = visited_countries.rows.map(row => row.country_code);

        res.render("index.ejs", { countries: countries, total: countries.length });
      } else {
        console.error("Invalid country code:", country_code);
        res.status(500).send("Invalid country code");
      }
    } else {
      res.status(404).send("Country not found");
    }
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send("Server error");
  }
});
*/







app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
