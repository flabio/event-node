const { response } = require("express");
const { firstLater } = require("../helpers/capitalLetra");
const { ERROR_TITLE_EXIST, SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED } = require("../helpers/global_constante");
const { Event } = require("../models");



const getEvents = async (req, res = response) => {
    try {
        const query={active:true}
        const { limit = 10, since = 0 } = req.params;
        const [events, total] = await Promise.all([
            Event.find(query)
                .populate('user_id', ['first_name', 'last_name'])
                .populate('organization_id', 'name')
              
                .skip(since)
                .limit(limit),
            Event.countDocuments(query)
        ]);
        res.json({
            total,
            data:events
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getKanban = async (req, res = response) => {
    try {
     
        const [draw,aproved_shepherd,aproved_higher,aproved,archived,canceled] = await Promise.all([
            Event.find({active:true,state:'draw'})
                .populate('user_id', ['first_name', 'last_name'])
                .populate('organization_id', 'name'),
                Event.find({active:true,state:'aproved_shepherd'})
                .populate('user_id', ['first_name', 'last_name'])
                .populate('organization_id', 'name'),
                Event.find({active:true,state:'aproved_higher'})
                .populate('user_id', ['first_name', 'last_name'])
                .populate('organization_id', 'name'),
                Event.find({active:true,state:'aproved'})
                .populate('user_id', ['first_name', 'last_name'])
                .populate('organization_id', 'name'),
       
                Event.find({active:true,state:'archived'})
                .populate('user_id', ['first_name', 'last_name'])
                .populate('organization_id', 'name'),
       
                Event.find({active:true,state:'canceled'})
                .populate('user_id', ['first_name', 'last_name'])
                .populate('organization_id', 'name')
       
       
        ]);
       
        res.json({
         
            data:[
                    {draw:draw},
                    {aproved_shepherd:aproved_shepherd},
                    {aproved_higher:aproved_higher},
                    {aproved:aproved},
                    {archived:archived},
                    {canceled:canceled}
                ]
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getEventById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const event = await  Event.findById(id)
                .populate('user_id', ['first_name', 'last_name'])
                .populate('organization_id', 'name')
                .skip(since)
                .limit(limit);
        res.json({
            data:event
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const createdEvent = async (req, res = response) => {
    try {
        const { _id,...data } = req.body;
        data.title = firstLater(req.body.title);
        const{title}=data;
        data.user_id=req.user._id;
        existTitle=await Event.findOne({title})
        if(existTitle){
           return res.status(404).json({
                msg:ERROR_TITLE_EXIST,
            })
        }
        const event = new Event(data);
        await event.save()
        res.json({
            msg:SUCCESS_CREATED,
            event
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const updatedEvent = async (req, res = response) => {
    try {
        const{id}=req.params;
        const { _id,...data } = req.body;
        if(data){
            data.title = firstLater(data.title);
        
        }
       
        const event =await Event.findByIdAndUpdate(id,data,{new:true})
        res.json({
            msg:SUCCESS_UPDATED,
            event
        });
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
const changeStateEvent = async (req, res = response) => {
    try {
        const{id}=req.params;
        const { _id,state } = req.body;
        const event =await Event.findByIdAndUpdate(id,{state},{new:true})
        res.json({
            msg:SUCCESS_UPDATED,
            event
        });
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
const deletedEvent = async (req, res = response) => {
    try {
        const{id}=req.params;
        const event =await Event.findByIdAndUpdate(id,{active:false},{new:true})
        res.json({
            msg:SUCCESS_DELETED,
            event
        });
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = {
    getEvents,
    getEventById,
    createdEvent,
    updatedEvent,
    deletedEvent,
    changeStateEvent,
    getKanban
}