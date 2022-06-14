const { response, request } = require("express")
const jwt = require('jsonwebtoken');
const { THERE_IS_NO_TOKEN, TOKEN_INVALID_DB, TOKEN_INVALID_ACTIVE, TOKEN_INVALID } = require("../helpers/global_constante");
const { User } = require("../models");


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: THERE_IS_NO_TOKEN
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: TOKEN_INVALID_DB
            })
        }

        if (!user.active) {
            return res.status(401).json({
                msg: TOKEN_INVALID_ACTIVE
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: TOKEN_INVALID
        })
    }

}

module.exports = {
    validarJWT
}