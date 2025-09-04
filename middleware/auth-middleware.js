const {verifyToken} = require('../utils/token');


module.exports.authenticatedRoute = async (req, res, next) => {
    const requiredAuthHeader = req.headers['authorization'];
    const token = requiredAuthHeader?.split(' ')?.[1];
    const isAuthenticated =  verifyToken(token);
    if (isAuthenticated) {
        req.userId = isAuthenticated.id;
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
