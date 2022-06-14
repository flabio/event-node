const { response, request } = require("express");
const { User } = require("../models");


const isAdminRol=async(req=request,res=response,next)=>{
    const user=await User.findById(req.user._id).populate('rol_id');

    if(!req.user){
        return res.status(500).json({
            msg:'You want to verify the role without validating the token first'
        });
    }
    const{name}=user.rol_id;
   
    if(name!=="Admin"){
        return res.status(401).json({
            msg:`${user.first_name} You are not an administrator - You cannot do this`})
    }
    next();
}

const hasRol=(...roles)=>{
    return async (req=request,res=response,next)=>{
       
        const user=await User.findById(req.user._id).populate('rol_id');
        const{name}=user.rol_id;
        if(!req.user){
            return res.status(500).json({
                msg:'You want to verify the role without validating the token first'
            });
        }
        if(!roles.includes(name)){
            return res.status(401).json({
                msg:`The service requires one of these roles: ${roles} `
            });
        }
        next();
    }
}
module.exports={
    isAdminRol,
    hasRol
}