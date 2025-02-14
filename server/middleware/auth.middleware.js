const jwt  =  require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    try {
        const authHeader =  req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: 'Unauthorized'});
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next()
    }
        catch (error) {
            return res.status(401).json({ message: 'Token invalide ou expiré.' });
        }
        
}
const adminMiddleware = (req, res, next) => {
    if (!req.user || !req.user.userAdmin) {
        return res.status(403).json({ errors: "Accès interdit. Vous n'êtes pas administrateur." });
    }
    next();
};