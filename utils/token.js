const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user?.name, email: user?.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};
