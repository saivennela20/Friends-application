import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  room_name:{
    type:String,
    required:"Room Name is required"
  },
  users:[String],
  created_by:{
    type:String,
    required:"Create by is required"
  },
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
  collection: 'Room'
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
const Room = mongoose.model('Room',Schema);
export default Room;