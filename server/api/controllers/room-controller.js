import * as roomService from '../services/room-service.js';
import * as chatService from './../services/chat-service.js';
import * as scheduleService from './../services/schedule-service.js';
import * as todoService from './../services/todoItem-service.js';
import * as CONST from '../constants.js';
/**
 * Sets error to the response.
 * @param {Object} error - Error Object 
 * @param {Response} response - Response Object to the client
 */
const setErrorResponse=(error, response)=>{
  response.status(500);
  response.json(error);
}

/**
 * Sets response code and body to the response.
 * @param {int} statusCode - Response status code 
 * @param {Object} object - Response body object 
 * @param {Response} response - Response Object to the client
 */
const setSuccessResponse=(statusCode,object, response)=>{
  response.status(statusCode);
  response.json(object);
}

/**
 * Creates a Room.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const createRoom=async (request, response)=>{
  try{
  const payload = request.body;
  payload.created_by=request.ctx.user.username;
  const room = await roomService.createRoom(payload);
  console.log({"created the room":room});
  const chatRoom = await chatService.createChat(payload);
  console.log({"created the chat room":chatRoom});
  payload['username']=request.ctx.user.username;
  const scheduleGroup = await scheduleService.createScheduleGroup(payload);
  console.log({"created the schedule Group ":scheduleGroup});
  const todoList = await todoService.createTodoList(payload.room_name);
  console.log()
  //need to validate user emails if user is present or not
  setSuccessResponse(201,room,response);
  }
  catch(error){
    console.log(error)
    if(error === "ROOM_ALREADY_EXISTS"){
      response.status(404);
      response.send({"error":error});
      return;
    }
    setErrorResponse(error,response);
  }
}



/**
 * get Room details.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const getRoom=async (request, response)=>{
  try{
  const room = await roomService.getRoom(request.params);
  //need to validate user emails if user is present or not
  setSuccessResponse(201,room,response);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error,response);
  }
}


/**
 * Add an User to room.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const updateUserInRoom = async (req,res) =>{

  try{
    const room = await roomService.getRoom(req.params);
    if(room.created_by!==req.ctx.user.username){
      console.log("USER_NOT_ALLOWED");
      res.status(401);
      res.send()
      return;
    }
  }
  catch(e){
    console.log(e);
  }
  try{
    const room = await roomService.updateUsers(req.params.room_name,req.body);
    console.log({"room details in controller:":room});
    setSuccessResponse(200,room,res);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error, res);
  }
}

/**
 * Add an User to room.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const removeUserFromRoom = async (req,res) =>{
  try{
    const room = await roomService.removeUser(req.params.room_name,req.body.user);
    console.log({"room details in controller:":room});
    setSuccessResponse(200,room,res);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error, res);
  }
}

/**
 * get all rooms for user
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const getAllRoomsForUser = async (req,res) =>{
  try {
    const username  = req.ctx.user.username;
    
    const rooms = await roomService.getAllRoomsForUser(username);
    setSuccessResponse(200,rooms,res);
  } catch (error) {
    setErrorResponse(error,res);
  }
}


export const updateRoom = async (req,res)=>{
  try{
    const username = req.ctx.user.username;

    const rooms = await roomService.updateRoom(req.params.room_name,req.body);
    if(req.params.room_name !== req.body.room_name){
        await chatService.updateRoomNameInChatGroup(req.params.room_name,req.body.room_name);
        await todoService.updateRoomNameInTodoGroup(req.params.room_name,req.body.room_name);
        await scheduleService.updateRoomNameInScheduleGroup(req.params.room_name,req.body.room_name);
    }
    setSuccessResponse(200,rooms,res);
  } catch (error) {
    setErrorResponse(error,res);
  }
}


export const deleteRoom = async (req,res)=>{
  try{
    const username = req.ctx.user.username;

    
    const rooms = await roomService.deleteRoom(req.params.room_name);
    
    setSuccessResponse(200,rooms,res);
  } catch (error) {
    setErrorResponse(error,res);
  }
}
