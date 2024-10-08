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

env.config();
app.use(cors()); // This will allow all origins
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Replace 'YOUR_API_KEY' with your actual API key
const NEWS_API_URL = "https://newsapi.org/v2/everything";
const API_KEY = process.env.NEWSAPI;

app.get("/news", async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: "law",
        from: "2024-09-06",
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

const User = mongoose.model("User", userSchema);

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
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
