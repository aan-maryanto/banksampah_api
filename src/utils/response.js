const {response} = require("express");
const baseResponse = (code, message, data) => {
    return response.status(code).json({
        "code":code,
        "message":message,
        "data":data
    })
}

module.exports = {
    baseResponse
}