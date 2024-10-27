const express = require("express");
const cors = require("cors");
const axios = require("axios");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const session = require("express-session");
const Strategy = require("passport-local").Strategy;

env.config(); // Loading .env
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // This will allow all origins
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: false, // Allow cross-site usage
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * News API Route
 */
const NEWS_API_URL = "https://newsapi.org/v2/everything";
const API_KEY = process.env.NEWSAPI;

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth()).padStart(2, "0");
var yyyy = today.getFullYear();
var date = yyyy + "-" + mm + "-" + dd;

app.get("/news", async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: "law",
        from: date,
        sortBy: "publishedAt",
        apiKey: API_KEY,
      },
    });
    console.log(response.data);
    res.json(response.data.articles);
  } catch (error) {
    console.error("Error fetching data from NewsAPI:", error);
    res.status(500).json({ error: "Error fetching news" });
  }
});

/**
 * Mongo DB access
 */

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas", err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const chronicleSchema = new mongoose.Schema({
  email: String,
  content: String,
});

const User = mongoose.model("User", userSchema);
const Chronicle = mongoose.model("Chronicle", chronicleSchema);
/**
 * Access all chronicles
 */
app.get("/chronicles", async (req, res) => {
  if (!req.isAuthenticated) {
    return res.status(403).json({ error: "Not logged In" });
  }
  const chronicles = await Chronicle.find();
  console.log(chronicles);
  console.log(req.session.user);
  return res.json({ chronicles });
});
/**
 * Add chronicles when logged in
 */
app.post("/add/chronicles", async (req, res) => {
  if (req.isAuthenticated()) {
    const email = req.body.username;
    const content = req.body.content;
    const newChronicle = new Chronicle({ email, content });
    await newChronicle.save();
    return res.status(200).json({ message: "Added" });
  }
  return res.status(403).json({ error: "Not logged In" });
});

/**
 * Login Route
 */
app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging in:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      req.session.user = user;
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});
/**
 * Register route
 */
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(201)
        .json({ message: "Email is associated with another account" });
    } else {
      bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const newUser = new User({
            email,
            password: hash,
          });
          await newUser.save();
          req.login(newUser, (err) => {
            console.log("Registration successful");
            return res.status(200).json({ message: "Successfully Registered" });
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});
/**
 * Logout route
 */
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.json({ message: "Logged Out" });
  });
});
/**
 * Passport stratergy
 */
passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ email: username });
      if (user) {
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb(null, false, { message: "User not found" });
      }
    } catch (err) {
      console.log(err);
      return cb(err);
    }
  })
);

/**
 * Serilaization and Deserialization
 */
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});
/**
 * Running the app
 */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
