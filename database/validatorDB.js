const { User, Rol, Organization, TypeEvent, Event } = require("../models")




const IsExistEmail = async (email = '') => {
    const ExistEmail = await User.findOne({ email });
    if (ExistEmail) {
        throw new Error(`The email ${email} exist`)
    }
}
const IsExistIdUser = async (id) => {
    const ExistId = await User.findById(id);
    if (!ExistId) {
        MsgErrorId(id)
    }
}
const IsExistIdEvent = async (id) => {
    const ExistId = await Event.findById(id);
    if (!ExistId) {
        MsgErrorId(id)
    }
}
const IsExistIdRol = async (id) => {
    const ExistId = await Rol.findById(id);
    if (!ExistId) {
        MsgErrorId(id)
    }
}

const IsExistIdOrganization = async (id) => {
    const ExistId = await Organization.findById(id);
    if (!ExistId) {
        MsgErrorId(id)
    }
}
const IsExistIdTypeEvent = async (id) => {
    const ExistId = await TypeEvent.findById(id);
    if (!ExistId) {
        MsgErrorId(id)
    }
}

const MsgErrorId = (id) => {
    throw new Error(`The id ${id} does not exist`);
}



module.exports = {
    IsExistEmail,
    IsExistIdUser,
    IsExistIdRol,
    IsExistIdOrganization,
    IsExistIdTypeEvent,
    IsExistIdEvent
}