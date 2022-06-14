const { model, Schema } = require('mongoose');

const UserModel = Schema({
    first_name: {
        type: String,
        required: [true, 'The first name is required']
    },
    last_name: {
        type: String,
        required: [true, 'The last name is required']
    },
    email:{
        type: String,
        required: [true,'The email is required'],
        unique: true
    },
    gander:{
        type: String,
        required: [true,'The gander is required'],
        enum:['M','F']
    },
    phone:{
        type:String
    },
    address:{
        type:String,
        required: [true,'The address is required']
    },
    bio:{
        type:String,
    },
    password:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    },
    rol_id:{
        type:Schema.Types.ObjectId,
        ref:'Rol',
        required:true,
    }

});
UserModel.methods.toJSON=function (){
    const{__v,rol_id,password,_id,active,...data}=this.toObject();
    data.id=_id;
    //data.rol=rol_id.name;
    return data;
}

module.exports=model('User',UserModel)