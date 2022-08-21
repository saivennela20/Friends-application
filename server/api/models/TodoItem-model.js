import mongoose from "mongoose";

//A todo object has id, title, description, createdDate, & lastModifiedDate properties.
// Model  -- Schema creation 3 levels according to ipad 

const ToDoList = new mongoose.Schema({
  title:{
    type:String,
    required:"Title is required"
  },
  description:{
    type:String
  },
  date:{
    type:Date,
    required:"Date required"
  },
  time:{
    type:String,
    required:"Time required"
  },
  status:{
    type:Boolean,
    default:false
  },
  createdDate:{
    type:Date,
    default:Date.now
  },
  modifiedDate:{
    type:Date,
    default:Date.now
  }

});

const RoomSchema = new mongoose.Schema({
  name:{
    type:String,
    required:"Room Name is required"
  },
  todolist:[{
    type:ToDoList
  }
  ]
}
,{skipVersioning:true});

// Duplicate the ID field.
RoomSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

//deleting unnecessary fields in response
RoomSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id ;delete ret.__v }
});
const model = mongoose.model('TodoTask',RoomSchema);

export default model;