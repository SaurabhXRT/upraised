const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token){
            res.status(400).json({
                message: "no token provideed"
            })
        } 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ 
            where: { 
                email: decoded.email 
            } 
        });
        if (!user){
            return res.status(404).json({
                message: "user not found"
            });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ 
            error: 'Please authenticate' 
        });
    }
};

module.exports = auth;