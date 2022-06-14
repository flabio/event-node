const { response } = require("express");
const { firstLater } = require("../helpers/capitalLetra");
const { ERROR_NAME_EXIST, SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED } = require("../helpers/global_constante");
const { Organization } = require("../models");




const getOrganizations = async (req, res = response) => {

    try {
        const { limit = 5, since = 0 } = req.query;
        const query={active:true}
        const [organizations, total] = await Promise.all([
            await Organization.find(query)
                .skip(since)
                .limit(limit),
            await Organization.countDocuments(query)
        ]);
        res.json({
            total,
            limit,
            since,
            data: organizations,
          
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}
const getOrganizationById = async (req, res = response) => {
    try {
        
        const { id } = req.params;
        const organization = await Organization.findById(id);
        res.json({
            data: organization
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

const createdOrganization = async (req, res = response) => {
    try {
        const { _id, ...data } = req.body;
        data.name = firstLater(req.body.name)
        const {name}=data
        const existsName = await Organization.findOne({name});
        if (existsName) {
            return res.status(404).json({
                msg: ERROR_NAME_EXIST
            });
        }
        const organization = new Organization(data);
        organization.save();
        res.json({
            msg: SUCCESS_CREATED,
            data: organization,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}
const updatedOrganization = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;
        if (data) {
            data.name = firstLater(req.body.name);
        }
        const organization = await Organization.findByIdAndUpdate(id, data, { new: true });
        res.json({
            msg: SUCCESS_UPDATED,
            data: organization
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

const deletedOrganization = async (req, res = response) => {
    try {
        const { id } = req.params;
        const organization = await Organization.findByIdAndUpdate(id,{active:false}, { new: true });
        res.json({
            msg: SUCCESS_DELETED,
            data: organization
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

module.exports = {
    getOrganizations,
    getOrganizationById,
    createdOrganization,
    updatedOrganization,
    deletedOrganization
}