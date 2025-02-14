const jwt = require('jsonwebtoken');

// const SECRET_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjQyZDQ0ZTZlN2U4Njc0NWIzNWQ3NTMwM2FlNzQ4MDJjIn0.e30.bmWFP90RlEMRrI37HdklHuMnrti5mPbIvqL2J-oP5AIT2EAz05gucJ1GRmeDDRJR7ySLCfvErEKJfAM9ztrnKQ";
const SECRET_KEY = process.env.JWT_SECRET;
module.exports.getUserDetails = async (req, res) => {
    try {
        let token = req.headers['authorization'];
        console.log("Authorization Header:", token);

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Supprime "Bearer " si présent
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const verifyToken = jwt.verify(token, SECRET_KEY);
        console.log('Token verified:', verifyToken);

        res.status(200).json({ message: "Token valid", user: verifyToken });
    } catch (err) {
        console.error('Invalid token:', err.message);
        res.status(401).json({ error: "Invalid token" });
    }
};
