import * as ScheduleUtil from './../../js/schedule/schedule-util';

export const ScheduleActionType ={
  SHOW_ROOMS: "[Room] Get all Rooms for current user",
  SHOW_TASKS: "[Tasks] Get all task in Room",
  SHOW_TASK: "[Tasks] Show selected task",
  ADD_TASK: "[Task] Add Task",
  UPDATE_TASK: "[Task] Update Task",
  UPDATE_FORM_DATA:"[Task] update task data"
};


export const showRooms =  (payload) => {
  return{
    type: ScheduleActionType.SHOW_ROOMS,
    payload
  }
}

export const showTasks =  (payload) => {
  return{
    type: ScheduleActionType.SHOW_TASKS,
    payload
  }
}
export const showTask =  (payload) => {
  return{
    type: ScheduleActionType.SHOW_TASK,
    payload
  }
}
export const addTask =  (payload) => {
  

  return{
    type: ScheduleActionType.ADD_TASK,
    payload
  }
}
export const updateTask =  (payload) => {
  return{
    type: ScheduleActionType.UPDATE_TASK,
    payload
  }
}

export const updateFormData =  (payload) => {
  return{
    type: ScheduleActionType.UPDATE_FORM_DATA,
    payload
  }
}


