const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

var cors = require("cors");
const app = express();
const db = new sqlite3.Database("./database.db");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

function authenticateToken(req, res, next) {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader);
  if (token === null && token === undefined) {
    return res.status(401).redirect("http://localhost:5173/");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
}

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
        console.log(`Successfully creating user ${fullName} ${matricNo}`);
        res.status(200).redirect(`http://localhost:5173/successful-register`);
      }
    );
  });
});

app.post("/api/login", (req, res) => {
  const { matricNo, password } = req.body;

  if (!matricNo && !password) {
    return res.status(400).redirect("http://localhost:5173/");
  }

  try {
    let user;
    db.get("SELECT * FROM User WHERE matricNo = ?", [matricNo], (err, row) => {
      if (err) {
        res.status(500).send({ error: "Something went wrong on the server" });
        return;
      }

      user = row;

      if (!user) {
        return res.status(404).redirect("http://localhost:5173/");
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result == true) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

            // set expires to 15 minutes
            res.cookie("token", accessToken, {
              expires: new Date(Date.now() + 900000),
            });
            res.cookie("matricNo", user.matricNo);
            res.cookie("fullName", user.fullName);
            return res.status(200).redirect("http://localhost:5173/home");
          } else {
            return res.status(400).redirect("http://localhost:5173/");
          }
        });
      }
    });
  } catch (err) {
    return res.status(400).send({
      message: "An error occured",
      error: error.message,
    });
  }
});

app.get("/api/checkout", authenticateToken, (req, res) => {});

app.get("/api/items", (req, res) => {
  db.all("SELECT * FROM Item", [], (err, rows) => {
    res.status(200).send(rows);
  });
});

app.listen(process.env.NODEJS_PORT, () =>
  console.log(`Server is running at port ${process.env.NODEJS_PORT}`)
);
