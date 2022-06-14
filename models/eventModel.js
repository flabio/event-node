const{model,Schema}=require('mongoose');
const { TITLE_REQUIRED, DESCRIPTION_REQUIRED, PLACE_REQUIRED, ADDRESS_REQUIRED, START_DATE_REQUIRED, END_DATE_REQUIRED, DUE_DATE_REQUIRED, STATE_REQUIRED } = require('../helpers/global_constante');

const EventModel=Schema({
    title:{
        type:String,
        required:[true,TITLE_REQUIRED],
    },
    description:{
        type:String,
        required:[true,DESCRIPTION_REQUIRED]
    },
    place:{
        type:String,
        required:[true,PLACE_REQUIRED]
    },
    address:{
        type:String,
        required:[true,ADDRESS_REQUIRED]
    },
    start_date:{
        type:Date,
        required:[true,START_DATE_REQUIRED]
    },
    end_date:{
        type:Date,
        required:[true,END_DATE_REQUIRED]
    },
    due_date:{
        type:Date,
        required:[true,DUE_DATE_REQUIRED]
    },
    is_plublic:{
        type:Boolean,
        default:true
    },
    state:{
        type:String,
        required:[true,STATE_REQUIRED],
        enum:['draw','aproved_shepherd','aproved_higher','aproved','archived','canceled']
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'The user is required']
    },
    organization_id:{
        type:Schema.Types.ObjectId,
        ref:'Organization',
        required:[true,'The organization is required']
    },
    type_event_id:{
        type:Schema.Types.ObjectId,
        ref:'TypeEvent',
        required:[true,'The type event is required']
    },
    active:{
        type:Boolean,
        default:true
    },
    created:{
        type:Date,
        default:Date,

    }

});

EventModel.methods=function(){
    const{__v,_id,active,...data}=this.toObject();
    return data;
}
module.exports=model('Event',EventModel);