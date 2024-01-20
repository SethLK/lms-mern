const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Unauthorized please Login" });
    }

    console.log(token)

    jwt.verify(token, config.secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.user = user;
        console.log(req.user);
        next();
    });
};

module.exports = authenticateToken;