const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.db");
var cors = require("cors");
require("dotenv").config();
app.use(express.json());
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

db.serialize(() => {
  // db.run(`CREATE TABLE IF NOT EXISTS Student (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       name STRING NOT NULL)
  //       `),
  //   (err) => {
  //     if (err) {
  //       console.error("error", err);
  //     }
  //   };
  // db.run(`CREATE TABLE IF NOT EXISTS User (
  //       matricNo INTEGER PRIMARY KEY,
  //       fullName STRING NOT NULL,
  //       phoneNumber STRING NOT NULL,
  //       password STRING NOT NULL
  //     )
  //       `),
  //   (err) => {
  //     if (err) {
  //       console.error("error", err);
  //     }
  //   };
  // db.run(`INSERT INTO Student(name) VALUES(?)`, ["Hakim Nazri"]);
  // db.run(`INSERT INTO Student(name) VALUES(?)`, ["Hakim Nazri"]);
  // db.run(`INSERT INTO Student(name) VALUES(?)`, ["Hakim Nazri"]);
  // db.run(`DELETE FROM User WHERE matricNo = 2110457`);
});
app.post("/api/register", (req, res) => {
  const { fullName, matricNo, phoneNumber, password } = req.body;
  console.log(password);

  if (password[0] !== password[1]) {
    res.status(400).send({ error: "Password does not match. Register again" });
    return;
  }

  if (password[0].length < 12) {
    res.status(400).send({ error: "Password less than 12 character" });
    return;
  }

  const saltRounds = 10;

  bcrypt.hash(password[0], saltRounds, (err, hash) => {
    db.run(
      "INSERT INTO User(matricNo, fullName, phoneNumber, password) VALUES(?, ?, ?, ?)",
      [matricNo, fullName, phoneNumber, hash],
      (err) => {
        if (err) {
          res.status(500).send({ error: "cannot create new user", err });
          return;
        }
        console.log(fullName);
        console.log(password[0]);
        console.log(phoneNumber);
        console.log(matricNo);

        console.log(`Successfully creating user ${fullName} ${matricNo}`);
        res.status(200).redirect(`http://localhost:5173/successful-register`);
      }
    );
  });
});

app.post("/api/login", (req, res) => {
  const { matricNo, password } = req.body;

  try {
    let user;
    db.get("SELECT * FROM User WHERE matricNo = ?", [matricNo], (err, row) => {
      if (err) {
        res.status(500).send({ error: "Something went wrong on the server" });
        return;
      }
      console.log(user);

      user = row;

      if (!user) {
        return res.status(404).redirect("http://localhost:5173/");
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result == true) {
            return res.status(200).redirect("http://localhost:5173/home");
          } else {
            return res.status(400).redirect("http://localhost:5173/");
          }
        });
      }
    });
  } catch (err) {
    res.status(400).send({
      message: "An error occured",
      error: error.message,
    });
  }
});

app.get("/api/items", (req, res) => {
  db.all("SELECT * FROM Item", [], (err, rows) => {
    res.status(200).send(rows);
  });
});

app.listen(process.env.NODEJS_PORT, () =>
  console.log(`Server is running at port ${process.env.NODEJS_PORT}`)
);
