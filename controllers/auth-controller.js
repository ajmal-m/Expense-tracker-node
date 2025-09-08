const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const { generateToken , verifyToken} = require('../utils/token');

module.exports.Register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ token , user : {name: newUser.name, email: newUser.email, _id: newUser._id}});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports.Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, user:{ name: user.name, email: user.email, _id: user._id , currency: user?.currency } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.checkAuthenticated = async (req, res) => {
    const requiredAuthHeader = req.headers['authorization'];
    const token = requiredAuthHeader?.split(' ')?.[1];
    const isAuthenticated =  verifyToken(token);
    if (isAuthenticated) {
        res.status(200).json({ 
            message: 'Valid token', 
            name: isAuthenticated.name, 
            email: isAuthenticated.email, 
            currency: isAuthenticated.currency,
            _id: isAuthenticated.id 
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
