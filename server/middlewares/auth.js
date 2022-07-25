const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        if (!req.headers["authorization"])
            return res.status(401).json({ error: "UnAuthorized" })
        let token = req.headers["authorization"].split(" ")[1]
        const user = jwt.verify(token, process.env.SECRETKEY)
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "UnAuthorized!" })
    }
}

module.exports = auth;