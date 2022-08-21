import * as RequestUtil from '../util/RequestUtil';

/**
 * To get task for current room
 * @param {String} room_name - room name
 */
 export const getTasksForRoom = async function(room_name){
  const data = await RequestUtil.getReq(`schedule/${room_name}`);  
  return data;
  // need to show proper error messages
}


/**
 * To get task details
 * @param {String} room_name - room in which the task is present
 * @param {String} task_name - task name for which details are needed
 */
 export const getTask = async  function(room_name,task_name){
  const data = await RequestUtil.getReq(`schedule/${room_name}/${task_name}`);  
  console.log(data);
  return data;
  // need to show proper error messages
}



/**
 * add task in room
 * @param {String} room_name - room in which the task needs to be added
 * @param {JSON} task - task that needs to be added
 */
 export const addTask = async  function(room_name,task){
  const data = await RequestUtil.postReq(`schedule/${room_name}`,task);  
  console.log(data);
  return data;
  // need to show proper error messages
}


/**
 * update task in room
 * @param {String} room_name - room in which the task needs to be updated
 * @param {JSON} task - task that needs to be updated
 */
 export const updateTask = async  function(room_name,task_old_name,task){
  const data = await RequestUtil.putReq(`schedule/${room_name}/${task_old_name}`,task);  
  console.log(data);
  return data;
  // need to show proper error messages
}


/**
 * delete task in room
 * @param {String} room_name - room in which the task needs to be updated
 * @param {JSON} task - task that needs to be updated
 */
 export const deleteTask = async  function(room_name,taskName){
  const data = await RequestUtil.deleteReq(`schedule/${room_name}/${taskName}`);  
  console.log(data);
  return data;
  // need to show proper error messages
}