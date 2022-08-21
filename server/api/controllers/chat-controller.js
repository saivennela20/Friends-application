import * as chatService from '../services/chat-service.js';
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
 * 
 * Creates a Chat Room.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const createChatRoom=async (request, response)=>{
  try{
  const payload = request.body;
  const room = await chatService.createChat(payload);
  //need to validate user emails if user is present or not
  setSuccessResponse(201,room,response);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error,response);
  }
}

/**
 * Returns a Chat Room.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const getChatRoom=async (request, response)=>{
  try{
    const room_name = request.params.room_name;
    const room = await chatService.getChatRoom({room_name});
    //need to validate user emails if user is present or not
    setSuccessResponse(201,room,response);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error,response);
  }
}




/**
 * adds message in room
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const addMessageToChat = async (req,res) =>{
  try {
    const username  = req.ctx.user.username;
    
    const chatRoom = await chatService.addMessageToChat(username,req.params.room_name,req.body);
    setSuccessResponse(200,chatRoom,res);
  } catch (error) {
    setErrorResponse(error,res);
  }
}


