import { ScheduleActionType } from "../Actions/schedule-action";
import AppState from '../State/schedule-state';
const reducer =  (state = AppState, action) =>{
  const type = action.type;
  let rooms=state.rooms;
  let currentRoomTasks=state.currentRoomTasks;
  let currentSelectedTask=state.currentSelectedTask;
  let currentRoom=state.currentRoom;
  let formData=state.form_state;
  switch(type){
    case ScheduleActionType.ADD_TASK:
      currentSelectedTask = action.payload
      break;
    case ScheduleActionType.SHOW_TASK:
      currentSelectedTask=action.payload.task;
      break;
    case ScheduleActionType.SHOW_ROOMS:
      rooms = action.payload.rooms
      break;
    case ScheduleActionType.SHOW_TASKS:
      currentRoom = action.payload.room;
      currentRoomTasks = action.payload.tasks;
      currentSelectedTask = action.payload.currentSelectedTask;
      //get tasks for room
      break;

    case ScheduleActionType.UPDATE_FORM_DATA:
      formData = Object.assign(formData,action.payload);  
        //get tasks for room
        break;
    case ScheduleActionType.UPDATE_TASK:
      //update task
      currentSelectedTask = action.payload
      break;
    default:
        rooms=[...state.rooms];
        currentRoomTasks=state.currentRoomTasks?[...state.currentRoomTasks]:state.currentRoomTasks;
        currentSelectedTask={...state.currentSelectedTask};
        currentRoom=state.currentRoom;
        // formData=state.form_state;
      break;

  }

  return Object.assign({},state,{rooms,currentRoomTasks,currentSelectedTask,currentRoom,formData});
} 

export default reducer;