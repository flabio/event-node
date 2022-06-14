const {validationResult} = require('express-validator');

const validateFied=(req,res,next)=>{
    const error= validationResult(req)
    if (!error.isEmpty()){
        return res.status(400).json({error:error})
    }
    next();
}
module.exports = {validateFied}