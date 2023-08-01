const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbpath = path.join(__dirname, "covid19Indiaportal.db");
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let db;

const intiliazationDBAndSrever = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`Error DB :${e.message}`);
  }
};

module.exports = app;

intiliazationDBAndSrever();

app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const getDetailsQuery = `SELECT 
    *
    FROM user

    WHERE 
    username = '${username}'

 `;
  const dbUser = await db.get(getDetailsQuery);
  response.send(dbUser);

  console.log(dbUser);
});
