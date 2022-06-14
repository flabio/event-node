const { response } = require("express");
const bcryptjs = require('bcryptjs');
const { firstLater } = require("../helpers/capitalLetra");
const { ERROR_NAME_EXIST, SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED } = require("../helpers/global_constante");
const { User } = require("../models");


const getUsers = async (req, res = response) => {
    try {
        const { limit = 5, since = 0 } = req.params;
        const [users, total] = await Promise.all([
            User.find().populate('rol_id','name').skip(since).limit(limit),
            User.countDocuments()
        ]);
        res.json({
            total,
            data:users
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
}

const getUserById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const users = await User.findById(id).populate('rol_id','name');
        res.json({
            users
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
}
const createdUser = async (req, res = response) => {
    try{
        const{_id,...data}=req.body;
        data.first_name=firstLater(data.first_name);
        data.last_name=firstLater(data.last_name);
        const salt = bcryptjs.genSaltSync()
        data.password = bcryptjs.hashSync(data.password, salt)
        const user= new User(data);
        await user.save()
        res.json({
            msg:SUCCESS_CREATED,
            user
        });
    }catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }
}
const updatedUser = async (req, res = response) => {
    try{
        const { id}=req.params;
        const{_id,...data}=req.body;
        data.first_name=firstLater(data.first_name);
        data.last_name=firstLater(data.last_name);
        // const salt = bcryptjs.genSaltSync()
        // data.password = bcryptjs.hashSync(data.password, salt)
        const user= await User.findByIdAndUpdate(id,data,{new:true});
        res.json({
            msg:SUCCESS_UPDATED,
            user
        });
    }catch(error){
        console.log(error);
        res.status(500).json({error:error})
    }
}
const deletedUser = async (req, res = response) => {
    try{
        const { id}=req.params;
        const user= await User.findByIdAndUpdate(id,{active:false},{new:true});
        res.json({msg:SUCCESS_DELETED,user});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error})
    }
}


module.exports = {
    getUsers,
    getUserById,
    createdUser,
    updatedUser,
    deletedUser
}