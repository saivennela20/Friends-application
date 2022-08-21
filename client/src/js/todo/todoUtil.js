import * as RequestUtil from '../util/RequestUtil';

/**
 * To get todoItems for current room
 * @param {String} room_name - room name
 */
 export const getItemsForRoom = async function(room_name){
  const data = await RequestUtil.getReq(`todo/${room_name}`);  
  return data;
  // need to show proper error messages
}





/**
 * add todoItem in room
 * @param {String} room_name - room in which the todo needs to be added
 * @param {JSON} item - todo item
 */
 export const addTodoItem = async  function(room_name,item){
  const data = await RequestUtil.postReq(`todo/${room_name}`,item);  
  console.log(data);
  return data;
  // need to show proper error messages
}


/**
 * update todo Item in room
 * @param {String} room_name - room in which the todo Item needs to be updated
 * @param {JSON} item - todoItem that needs to be updated
 */
 export const updateTodoItem = async  function(room_name,old_item_name,item){
  const data = await RequestUtil.putReq(`todo/${room_name}/${old_item_name}`,item);  
  console.log(data);
  return data;
  // need to show proper error messages
}


/**
 * delete todo Item in room
 * @param {String} room_name - room in which the todo Item needs to be updated
 * @param {JSON} itemName - task that needs to be updated
 */
 export const deleteTask = async  function(room_name,itemName){
  const data = await RequestUtil.deleteReq(`todo/${room_name}/${itemName}`);  
  console.log(data);
  return data;
  // need to show proper error messages
}