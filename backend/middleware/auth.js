const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    try {

        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        const token = authHeader?.split(" ")[1];

        console.log("Token", token);

        if (!token) {
            res.status(401).json({ message: "Token not provided or invalid", success: false, error: true })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        req.user = decoded;
        next();

    }
    catch (err) {
        res.status(401).json({ message: err.message, error: true, success: false })
    }
}