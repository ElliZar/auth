const router = require("express").Router();
const User = require("../models/User");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

// @route POST api/users
// @desc Register a user
// @access Public

const validation = [
  check("name", "Please, add name").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password with 6 or more characters").isLength({min: 6})];

router.post("/", validation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {name, email, role, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({msg : "User already exist"});
    }
    if (role === "Admin") {
      user = new User({
        name,
        email,
        Admin: true,
        password
      });
    } else {
      user = new User({
        name,
        email,
        Manager: true,
        password
      });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err;
      res.json({token})
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
