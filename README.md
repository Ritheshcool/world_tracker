World Tracker
World Tracker is a web application that helps you keep track of the countries you've visited. Simply input the name of a country, and the app will check it against a PostgreSQL database and highlight it on a world map, giving you a visual representation of your travel history.

Features
Country Input: Enter the name of a country you've visited.
Database Check: The app checks the country name against a PostgreSQL database.
Map Highlighting: Visited countries are highlighted on a world map.
Visual Travel Tracker: See the world map with highlighted countries to visualize where you've been.
Tech Stack
Backend: Node.js with Express.js
Database: PostgreSQL
Frontend: EJS templating, HTML, CSS, and JavaScript
Getting Started
Follow these steps to get a local copy of the project up and running.

Prerequisites
Node.js
PostgreSQL


INSTALLATION:

Clone the repository:

git clone https://github.com/yourusername/world_tracker.git
cd world_tracker
Install the dependencies:
npm install

Set up PostgreSQL:

Ensure you have PostgreSQL installed and running.

Create a database named world.

Create the necessary tables:

sql
Copy code
CREATE TABLE countries (
    country_code VARCHAR(3) PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL
);

CREATE TABLE visited_countries (
    country_code VARCHAR(3) REFERENCES countries(country_code),
    country_name VARCHAR(100) NOT NULL
);
Populate the countries table with the necessary data.
Configure your database connection:

In index.js, ensure your database connection details are correct:

javascript:
const db = new pg.Client({
  user: "your_postgres_username",
  host: "localhost",
  database: "world",
  password: "your_postgres_password",
  port: 5432,
});
Run the application:
node index.js

Visit the application:
Open your web browser and go to http://localhost:3000.
Usage
Enter the name of a country you have visited.
The app will check if the country exists in the database.
If it does, the country will be highlighted on the world map.
Contributing
If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

License
This project is open source and available under the MIT License.

Contact
For any questions, feel free to contact me at mr.sundar0705@gmail.com.

