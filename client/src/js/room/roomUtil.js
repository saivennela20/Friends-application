import * as RequestUtil from '../util/RequestUtil';

/**
 * To GetAll the rooms the current user is present in
 */
 export const getRoomsForUser = async function(user){
  let data ;
  
  try{
  data =  await RequestUtil.getReq(`room`);  

  }catch(e){
    console.log(e);
  }
  return data;
  // need to show proper error messages
}



/**
 * To create the rooms the current user is present in
 */
 export const createRoom = async function(room){
  let data ;
  
  try{
  data =  await RequestUtil.postReq(`room`,room);  

  }catch(e){
    console.log(e);
  }
  return data;
  // need to show proper error messages
}





/**
 * To create the rooms the current user is present in
 */
 export const updateRoom = async function(room,old_room_name){
  let data ;
  
  try{
  data =  await RequestUtil.putReq(`room/${old_room_name}`,room);  

  }catch(e){
    console.log(e);
  }
  return data;
  // need to show proper error messages
}



/**
 * To create the rooms the current user is present in
 */
 export const deleteRoom = async function(room_name){
  let data ;
  
  try{
  data =  await RequestUtil.deleteReq(`room/${room_name}`);  

  }catch(e){
    console.log(e);
  }
  return data;
  // need to show proper error messages
}
