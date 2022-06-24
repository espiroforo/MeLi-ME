const {request, response} = require('express');

const verifyToken = (req = request, res = response, next) => {

    const authToken = req.headers["x-auth-token"];

    if (authToken !== process.env.TOKEN && authToken !== process.env.MOCK) return res.sendStatus(401);
    req.mock = true;
    if (authToken == process.env.TOKEN){
        req.mock = false;
    }

    next();
}

module.exports = { verifyToken };
