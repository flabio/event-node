const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar_jwt");
const { User } = require("../models");

const Login= async(req,res=response)=>{
    const{email,password}=req.body;
    try{
        const user=await User.findOne({email}).populate('rol_id');
       
        if(!user){
            return res.status(400).json({
                msg:'user/password are not correct - email'
            })
        }
        if(!user.active){
            return res.status(400).json({
                msg:'user/password are not correct - active:false'
            })
        }
        
        const validaPassword= bcryptjs.compareSync(password,user.password);
        if(!validaPassword){
            return res.status(400).json({
                msg:'user/password are not correct - password'
            })
        }
        const token = await generarJWT(user.id)
        res.json({
            token,
            user    
        })
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports={
    Login
}