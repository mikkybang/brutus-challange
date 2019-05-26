var express = require("express");
var router = express.Router();
var User = require("./User")
const rateLimit = require("express-rate-limit");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mefemena@gmail.com',
      pass: '123daddy'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
  });


const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 2, // start blocking after 3 requests,
    onLimitReached:  function (req, res, next) {
        var mailOptions = {
            from: 'mefemenagmail.com',
            to: req.body.email,
            subject: 'Suspicious Account Activity',
            text: 'Someone Has tried to login into your account with incorrect Credentials more than three times'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });

        res.status(404).send("Too many Login attempts from this IP, please try again after 5 Minutes")
    },
  });


   

router.post("/register", async (req, res) => {
    const user = await (new User(req.body).save());
    res.json(user);
});

router.post("/login", loginLimiter ,async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        res.status(404).send("User not Found")
    }
    else{
        if(user.password === req.body.password){
            res.json(user)
        }
        else{
            res.status(404).send("incorrect password")
        }
    }
} );

module.exports = router;
