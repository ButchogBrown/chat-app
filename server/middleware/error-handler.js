const {StatusCodes} = require('http-status-codes')
const {CustomAPIError} = require('../error')

const errorHandlerMiddleware = (error, req, res, next) => {
    if(error instanceof CustomAPIError) {
        return res.status(error.statusCode).json({message: error.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')
}
module.exports = errorHandlerMiddleware