const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User.Model');

router.post('/register', async (req, res) => {
    // const Email = req.body.Email;
    // const Password = req.body.Password;

    const { Email, Password } = req.body;

    let exists = await User.findOne({ Email });
    if(exists)
    {
        return res.status(400).json('User Already Exist')
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(Password, salt)

    const newUser = User.create({ Email: Email, Password: hashedPass})
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json('Error: ' + err));

    // User.create({ Email: Email, Password: hashedPass})
    // const newUser = new User({ Email, hashedPass });

    // newUser.save()
    // .then(() => res.json('user added'))
    // .catch(err => res.status(400).json('Error: ' + err))
    // const {email, password} = req.body;
    // // try {
    //     let user = await User.findOne({ email });
    //     if(user) {
    //         return res.status(400).json({ msg: 'Email already exists' });
    //     }
        
    //     user = new User({
    //         email,
    //         password
    //     });
    //     const salt = await bcrypt.getSalt(10);
    //     user.Password = await bcrypt.hash(password, salt);
    //     await user.save();
        
    //     const payload = {
    //         user: {
    //             id: user._id,
    //         },
    //     };

    //     jwt.sign(
    //         payload,
    //         'abc123',
    //         { expiresIn: '7 days'},
    //         (err, token) => {
    //             if (err) throw err;
    //             res.json({ token })
    //         }
    //     );
    // }
    // catch (err){
    //     console.log(err.message);
    //     res.status(500).send('Server error')
    // }
})

router.post('/login', async (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    
    let user = await User.find({ Email });
    if(user)
    {
        return res.status(400).json('Email or password incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(Password, salt)

    const isMatch = await bcrypt.compare(hashedPass, user.Password);
    if(!isMatch)
    {
        return res.status(400).json('Email or password incorrect');
    }
    else
    {
        return res.status(200).json('Logged IN')
    }
})

// router.post('/user/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Email or password incorrect' });
//         }

//         const isMatch = await bcrypt.compare(password, user.Password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Email or password incorrect' });
//         }

//         const payload = {
//             user: {
//                 id: user,
//             }
//         }
    
//     } catch (err) {
        
//     }
    
// })

module.exports = router;