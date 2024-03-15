const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User.Model');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const loginUser = async (req, res) => {
  
  const { Email, Password } = req.body;

  let user = await User.findOne({ Email });

  if(!user)
  {
    setTimeout(() => {
      res.status(400).json('Email or Password is incorrect');
    }, 3000)
  }
  else
  {

    if(Password === null || Password === '')
    {
      res.status(400).json(`Password was not entered`)
    }
    else
    {
      const match = await bcrypt.compare(Password, user.Password);
    
      if(match)
      {
        let token = createToken('131');
        let Role = user.Role;
        res.status(200).json({Email, Role, token});
      }
      else
      {
        setTimeout(() => {
          res.status(400).json(`Email or Password is incorrect`)
        }, 3000)
      }
    }

  }


  
}

const registerUser = async (req, res) => {
    const { Email, Role, Password } = req.body;

    let exists = await User.findOne({ Email });

    if(exists === true)
    {
      return res.status(200).json('User Already Exists');
    }
    else
    {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(Password, salt);
      // res.status(200).json(`Email ${Email} have been created and the password is ${hashedPass}`);
      User.create({ Email: Email, Role: Role, Password: hashedPass})
      .then(() => res.status(200).json(`User ${Email} has been added`))
      .catch(err => res.status(400).json(err))
    }
}

module.exports = { registerUser, loginUser };
