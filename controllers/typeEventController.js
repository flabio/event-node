const { response } = require("express");
const { firstLater } = require("../helpers/capitalLetra");
const { ERROR_NAME_EXIST, SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED } = require("../helpers/global_constante");
const { TypeEvent } = require("../models")



const getTypeEvents = async (req, res = response) => {
    try {
        const query={active:true}
        const { limit, since } = req.params;
        const [typeEvents, total] = await Promise.all([
            TypeEvent.find(query).skip(since).limit(limit),
            TypeEvent.countDocuments(query)
        ]);
        res.json({
            total,
            data: typeEvents,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

const getTypeEventById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const typeEvent = await TypeEvent.findById(id);
        res.json({
            data: typeEvent,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}
const createdTypeEvent = async (req, res = response) => {
    try {
        const { _id, ...data } = req.body;
        data.name = firstLater(req.body.name)
        const {name}=data
        const existName = await TypeEvent.findOne({name})
     
        if (existName) {
            return res.status(404).json({
                msg: ERROR_NAME_EXIST
            });
        }
        const typeEvent = new TypeEvent(data)
        await typeEvent.save()
        res.json({
            msg: SUCCESS_CREATED,
            typeEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}
const updatedTypeEvent = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;
        if (data) {
            data.name = firstLater(req.body.name)
        }
        const typeEvent = await TypeEvent.findByIdAndUpdate(id, data, { new: true })
        res.json({
            msg: SUCCESS_UPDATED,
            typeEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}
const deletedTypeEvent = async (req, res = response) => {
    try {
        const { id } = req.params;
        const typeEvent = await TypeEvent.findByIdAndUpdate(id,{active:false}, { new: true })
        res.json({
            msg: SUCCESS_DELETED,
            typeEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}
module.exports = {
    getTypeEvents,
    getTypeEventById,
    createdTypeEvent,
    updatedTypeEvent,
    deletedTypeEvent
}