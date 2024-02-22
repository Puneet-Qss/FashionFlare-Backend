const User = require("../models/users");
const bcrypt = require("bcrypt");
const accessTokenSecret = "puneetKumarSharma";
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

// Multer configuration for file upload

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log("Logged in successfully");
    const accessToken = jwt.sign({ email: user.email }, accessTokenSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "codesharma452@gmail.com",
    pass: "fgeu seyq yllr zwmt",
  },
});

const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const accessToken = jwt.sign({ email }, accessTokenSecret, {
      expiresIn: "1h",
    });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accessToken,
    });

    await newUser.save();

    // Send email to the user
    const mailOptions = {
      from: "codesharma452@gmail.com",
      to: email,
      subject: "Welcome to Our App!",
      text: `Dear ${firstName},\n\nThank you for signing up with us!\n\nBest regards,\n Team FashonFlare`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + user.email);
      }
    });

    return res.status(200).json({
      message: "User Created Successfully",
      user: {
        firstName,
        lastName,
        email,
        accessToken,
      },
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  login,
  signUp,
};
