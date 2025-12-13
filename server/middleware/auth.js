const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../error')

const authenticationMiddleware = async(req, res, next) => {
    // const token = req.headers['authorization']
    const token =req.cookies.access_token;
    if(!token) {
        throw new UnauthenticatedError("No token provided.")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(error) {
        throw new UnauthenticatedError("Invalide token")
    }
}

module.exports = authenticationMiddleware