const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const nodemailer = require('nodemailer');
//
// router.get("/test", (req, res) =>{
//    res.send("Hello, It's working");
// });

router.post("/register", async (req, res) => {
    try{

        let {email, password, passwordCheck, displayName, userRole} = req.body;


        //validate
        if (!email || !password || !passwordCheck)
            return res.status(400).json({msg: "Not All Fields have been entered!"});
        if (password.length < 5)
            return res.status(400).json({msg: "Password needs to be at least 5 character long"});
        if (password !== passwordCheck)
            return res.status(400).json({msg: "Enter the same password"});

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

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'stdsender2020@gmail.com',
                pass: 'student321'
            }
        });

        let mailOptions = {
            from: '"Online Fashion Stop" <OnlineFashionStop@gmail.com>',
            to: `${email}`,
            subject: 'Online Fashion Stop',
            text: 'Your Store Manager account has been created.',
            html: `<b>Welcome to Online Fashion Stop! </b><br/><br/><br/>Your Store Manager account has been created.<br/><br/>User email: ${email}<br/>Password: ${password}`,
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });



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
                userRole: user.userRole
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

//Get User role - Store Manager
router.route('/getstoremanagers').get((req, res) => {
    User.find({"userRole" : "storeManager"})
        .then(storemanagers => res.json({ success: true, storemanagers }))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get user by id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json({ success: true, user }))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.email = req.body.email;
            user.displayName = req.body.displayName;
            user.password = req.body.password;

            let successMsg = 'Successfully Updated';
            user.save()
                .then(() => res.json({ success: true, successMsg }))
                .catch(err => res.status(400).json({ success: false, err }));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete by id route
router.route('/delete/:id').delete((req, res) => {
    let delSuccessMsg = 'Successfully Deleted';
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true, delSuccessMsg }))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;