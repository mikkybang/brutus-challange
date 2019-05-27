var express = require("express");
var router = express.Router();
var User = require("./User");
const rateLimit = require("express-rate-limit");
var nodemailer = require("nodemailer");
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: 'mikkybang',
    api_key: '123mikkybang'
  }
}

var transporter = nodemailer.createTransport(sgTransport(options));

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // start blocking after 3 requests,
  onLimitReached: function(req, res, next) {
    var mailOptions = {
      from: "mefemena@gmail.com",
      to: req.body.email,
      subject: "Suspicious Account Activity",
      text:
        "Someone Has tried to login into your account with incorrect Credentials more than three times"
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res
      .status(404)
      .send(
        "Too many Login attempts from this IP, please try again after 5 Minutes"
      );
  }
});

router.post("/register", async (req, res) => {
  const user = await new User(req.body).save();
  res.json(user);
});

router.post("/login", loginLimiter, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).send("User not Found");
  } else {
    if (user.password === req.body.password) {
      res.json(user);
    } else {
      res.status(404).send("incorrect password");
    }
  }
});

module.exports = router;
