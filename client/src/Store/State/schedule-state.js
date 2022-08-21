

let rooms=[];
let items=[];
let currentRoom={};
let currentRoomTasks=[];
let currentSelectedTask={};

let form_state={
  name:'',
  users:[],
  addUsers:[],
  removeUsers:[],
  addUserState:'',
  current_turn:'',
  created_by:'',
  error:{
    name:'',
    addUserState:'',
    current_turn:'',
  }

}
const state ={
  rooms,
  items,
  currentRoom,
  currentRoomTasks,
  currentSelectedTask
  // form_state
} 
export default state;
