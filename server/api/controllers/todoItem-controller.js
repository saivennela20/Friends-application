import * as todoItemService from './../services/todoItem-service.js'

//Request input from website to service connection
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
 * gets all item for the room
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */


 export const getAllItemForRoom=async (request, response)=>{
  try{
  const payload = request.body;
  const item = await todoItemService.getAllItemsForRoom(request.params.room_name);
  setSuccessResponse(201,item,response);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error,response);
  }
}

/**
 * adds todo item
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */


export const addItem=async (request, response)=>{
  try{
  const payload = request.body;
  const item = await todoItemService.addItemToList(request.params.room_name,payload);
  setSuccessResponse(201,item,response);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error,response);
  }
}
/**
 * updates the item in room.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const updateItem = async (req,res) =>{
  try{
    const items = await todoItemService.updateTodoItem(req.params.room_name,req.params.item_name,req.body);
    setSuccessResponse(200,items,res);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error, res);
  }
}

/**
 * remove an item
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const removeItem = async (req,res) =>{
  try{
    const items = await todoItemService.removeTodoItem(req.params.room_name,req.params.item_name);
    setSuccessResponse(200,items,res);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error, res);
  }
}








// todo for rooms





// export const gettodorooms = async(req,res) => {
//   try{
//     const item = await todoItemService.getAllrooms(); 
//     // Select * from rooms
//     setSuccessResponse(200,item,res);
//   }
//   catch(error){
//     console.log(error)
//     setErrorResponse(error, res);
//   }
// }

// export const gettodolist = async(req,res) => {
//   try{
//     const item = await todoItemService.getAllListsForRoom(req.params.roomid);
//     setSuccessResponse(200,item,res);
//   }
//   catch(error){
//     console.log(error)
//     setErrorResponse(error, res);
//   }
// }

// export const posttodolist = async(req,res) => {
//   try{
//     const roomid  = req.params.roomid;
//     const payload = request.body;
//     const item = await todoItemService.addList(roomid,payload);
//     setSuccessResponse(201,item,response);
//     }
//     catch(error){
//       console.log(error)
//       setErrorResponse(error,response);
//     }
// }
// export const deletetodolist = async(req,res) => {
//   try {
//     const id  = req.params.id;
//     const item = await todoItemService.get(req.params.id);
//     if(item === null){
//       setErrorResponse("Internal Error",res);
//       return;
//     }
//     const deletedItem = await todoItemService.remove(item);
//     setSuccessResponse(200,deletedItem,res);
//   } catch (error) {
//     setErrorResponse(error,res)
//   } 
// }
