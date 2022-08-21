import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  username:{
    type:String,
    required:"Room Name is required"
  },
  message:{
    type:String,
    required:"Message required"
  },
  created_time:{
    type:Date,
    default:Date.now
  },
});

const Schema = new mongoose.Schema({
  room_name:{
    type:String,
    required:"Room Name is required"
  },
  messages:[{
    type:MessageSchema
  }],
  created_time:{
    type:Date,
    default:Date.now
  },
  updated_time:{
    type:Date,
    default:Date.now
  }
},
{
  collection: 'Chat'
,skipVersioning:true});

// Duplicate the ID field.
Schema.virtual('id').get(function(){
  return this._id.toHexString();
});

//deleting unnecessary fields in response
Schema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id ;delete ret.__v }
});
const Chat = mongoose.model('Chat',Schema);
export default Chat;