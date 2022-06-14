const { model, Schema } = require('mongoose');
1
const OrganizationModel = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    active: {
        type: Boolean,
        default: true
    }
});
OrganizationModel.methods.toJSON=function(){
    const {__v,_id,...data} = this.toObject();
    data.id=_id;
    return data;
}

module.exports = model('Organization', OrganizationModel)



