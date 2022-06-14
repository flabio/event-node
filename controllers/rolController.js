const { response } = require("express");
const { firstLater } = require("../helpers/capitalLetra");
const { ERROR_NAME_EXIST, SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED } = require("../helpers/global_constante");
const { Rol } = require("../models");


const getRols = async (req, res = response) => {
    try {
        const query={active:true}
        const { limit = 10, since = 0 } = req.params;
        const [rols, total] = await Promise.all([
            Rol.find(query)
                .skip(since)
                .limit(limit),
            Rol.countDocuments(query)
        ]);
        res.json({
            total,
            data:rols
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

const getRolById = async (req, res = reponse) => {
    try {
        const { id } = req.params;
        const rol = await Rol.findById(id);
        res.json({
            data: rol
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

const createRol = async (req, res = reponse) => {
    try {
        const { _id, ...data } = req.body;

        const name = firstLater(data.name);
        const existName = await Rol.findOne({ name });
        if (existName) {
            return res.status(404).json({
                msg: ERROR_NAME_EXIST
            });
        }
        rol = new Rol({ name })
        await rol.save()
        res.json({
            msg: SUCCESS_CREATED,
            rol: rol
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

const updatedRol = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;
        if (data) {
            data.name = firstLater(req.body.name);
        }
        const rol = await Rol.findByIdAndUpdate(id, data, { new: true })
        res.json({
            msg: SUCCESS_UPDATED,
            rol
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}
const deletedRol = async (req, res = response) => {
    try {
        const { id } = req.params;
        const rol = await Rol.findByIdAndUpdate(id,{active:false}, { new: true })
        res.json({
            msg: SUCCESS_DELETED,
            rol
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}
module.exports = {
    getRols,
    getRolById,
    createRol,
    updatedRol,
    deletedRol
}