import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name:{
    type:String,
    required:"Task name required"
  },
  users:[
    String
  ],
  current_turn:{
    type:String,
    required:"user current needs to current task"
  },
  created_by:{
    type:String,
    required:"created by user required"
  },
  created_time:{
    type:Date,
    default:Date.now
  },
  updated_time:{
    type:Date,
    default:Date.now
  }
});

const Schema = new mongoose.Schema({
  room_name:{
    type:String,
    required:"Room Name is required"
  },
  tasks:[{
    type:TaskSchema
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
{collection: 'Schedule',skipVersioning:true});

// Duplicate the ID field.
Schema.virtual('id').get(function(){
  return this._id.toHexString();
});

//deleting unnecessary fields in response
Schema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id ;delete ret.__v }
});

const Schedule = mongoose.model('Schedule',Schema);
const Task = mongoose.model('Task',TaskSchema);
export { Schedule,Task};