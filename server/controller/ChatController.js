const User = require('../models/User')
const { UnauthenticatedError } = require('../error')
exports.home = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select("-password")

        if(!user) {
            throw new UnauthenticatedError('Unauthorized Access')
        }
        res.status(200).json({user: user})
    }catch (error) {
        console.log(error)
        next(error)
    }
}