const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

    // Validate the Data before Registering the User Data
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Checking if the user/email is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exits');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creating the new User if Validaiton is success.
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.detail[0].message);

    // Checking if the user/email is already in the database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found!');
    
    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password!')

    res.send('Logged in!')
});

module.exports = router;