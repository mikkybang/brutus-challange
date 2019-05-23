var express = require("express");
var router = express.Router();
var User = require("./User")




router.post("/register", async (req, res) => {
    const user = await (new User(req.body).save());
    res.json(user);
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        res.status(404).json({message: "User not found"})
    }
    else{
        if(user.password === req.body.password){
            res.json(user)
        }
        else{
            res.status(404).json({message: "incorrect password"})
        }
    }
} );

module.exports = router;
