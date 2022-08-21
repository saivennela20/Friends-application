import * as RequestUtil from '../util/RequestUtil';


const chatPath='chat';
/**
 * To send Message 
 * @param {JSON} user - user details
 */
 export const sendMessage = async function(room_name, message){
  const data = await RequestUtil.putReq(chatPath+'/'+room_name,message);  
  return data;
  // need to show proper error messages
}


/**
 * To get all message 
 * @param {JSON} user - user details
 */
 export const getAllMessage = async  function(room_name){
  const data = await RequestUtil.getReq(chatPath+'/'+room_name);
  console.log(data);
  return data;
  // need to show proper error messages
}

