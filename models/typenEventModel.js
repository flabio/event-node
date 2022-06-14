const { model, Schema } = require('mongoose');

const TypeEventModel = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    active: {
        type: Boolean,
        default: true
    }
});
TypeEventModel.methods.toJSON = function () {
    const { __v, _id, active, ...data } = this.toObject();
    data.id=_id;
    return data;
}
module.exports = model('TypeEvent', TypeEventModel)