const jwt = require('jsonwebtoken');
const User = require('../Models/User.Model');

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers;

    if(!authorization)
    {
        return res.status(401).json({error: 'Authorization Token Required'})
    }

    const token = authorization.split(' ')[1];

    try {
        jwt.verify(token, process.env.SECRET);

        // req.user = await User.findOne({ _id }).select('_id');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'request is not authorized'})
    }
}

module.exports = requireAuth;