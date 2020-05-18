const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
//
// router.get("/test", (req, res) =>{
//    res.send("Hello, It's working");
// });

router.post("/register", async (req, res) => {
    try{

        let {email, password, passwordCheck, displayName, userRole} = req.body;


        //validate
        // if (!email || !password || !passwordCheck)
        //     return res.status(400).json({msg: "Not All Fields have been entered!"});
        if (password.length < 5)
            return res.status(400).json({msg: "Password needs to be at least 5 character long"});
        // if (password !== passwordCheck)
        //     return res.status(400).json({msg: "Enter the same password"});

        const existingUser =  await User.findOne({email: email})
        // console.log(existingUser);
        if (existingUser)
            return res.status(400).json({msg: "An account with this email already exists"});
        if(!displayName) displayName = email;

        const salt = await bcrypt.genSalt(10);
        const  passwordHash = await bcrypt.hash(password, salt);
        // console.log(passwordHash);


        const newUser = new User({
            email,
            password: passwordHash,
            // passwordCheck:passwordHash ,
            displayName,
            userRole
        });

        const savedUser = await newUser.save();
        await res.json(savedUser);

    }
    catch(err){
        res.status(500).json('error from server:' + err.message);
    }
});


router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        //validate
        if (!email || !password)
            return res.status(400).json({msg: "Not All Fields have been entered!"});

        const user = await User.findOne({email: email});
        if(!user)
            return res.status(400).json({msg: "No Account with this email has been registered"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({msg: "Invalid Credential"});

        const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN);

        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email,
                userType: user.userRole
            }
        })
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});


router.post("/tokenValid", async (req, res) =>{
    try{
        const token = req.header("x-auth-token");
        if(!token)
            return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        if(!verified)
            return res.json(false);

        const user = await User.findById(verified.id);
        if(!user)
            return res.json(false);

        return res.json(true);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});


module.exports = router;