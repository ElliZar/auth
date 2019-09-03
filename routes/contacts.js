const router = require("express").Router();
const {check, validationResult} = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route GET api/contacts
// @desc Get all users contacts
// @access Privet
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/contacts
// @desc  Add new users contacts
// @access Privet
const validation = [ check("name", "Name is required").not().isEmpty(),check("phone", "Phone is required").not().isEmpty()];

router.post("/", [auth,validation], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  };
  const {name, email, phone, type} = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/contacts
// @desc  Update contact
// @access Privet
router.put("/:id", (req, res) => {

});

// @route Delete api/contacts
// @desc  Delete contact
// @access Privet
router.delete("/:id", (req, res) => {

});

module.exports = router;
