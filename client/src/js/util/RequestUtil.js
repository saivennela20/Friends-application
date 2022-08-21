import * as CONST from '../../constants';

/**
 * To send GET Request
 * @param {String} path - url path for GET request
 */
export const getReq = async function(path){
  console.log(CONST.BASE_URL+"/"+path,);
  return await fetch(CONST.BASE_URL+"/"+path,
  {
    method:'GET',
    headers:{'token':sessionStorage.getItem('token')}
  });
}

/**
 * To send POST Request
 * @param {String} path - url path for POST request
 * @param {JSON} bodyJSON - post json body for request
 */
export const postReq = function(path,bodyJSON){
  return fetch(CONST.BASE_URL+"/"+path,{
    method:'POST',
    headers:{'Content-Type': 'application/json',
    'token':sessionStorage.getItem('token'),
    'Access-Control-Allow-Methods':'GET,HEAD,PUT,PATCH,POST,DELETE'},
    body:JSON.stringify(bodyJSON)
  })
}

/**
 * To send PUT Request
 * @param {String} path - url path for PUT request
 * @param {JSON} bodyJSON - post json body for request
 */
export const putReq = function(path,bodyJSON){
  return fetch(CONST.BASE_URL+"/"+path,{
    method:'PUT',
    headers:{'Content-Type': 'application/json',
    'token':sessionStorage.getItem('token'),
    'Access-Control-Allow-Methods':'GET,HEAD,PUT,PATCH,POST,DELETE'},
    body:JSON.stringify(bodyJSON)
  })
}

/**
 * To send DELETE Request
 * @param {String} path - url path for DELETE request
 * @param {JSON} bodyJSON - post json body for request
 */
export const deleteReq = function(path,bodyJSON){
  return fetch(CONST.BASE_URL+"/"+path,{
    method:'DELETE',
    headers:{
      'Content-Type': 'application/json',
      'token':sessionStorage.getItem('token'),
      'Access-Control-Allow-Methods':'GET,HEAD,PUT,PATCH,POST,DELETE'},
    body:JSON.stringify(bodyJSON),
  })
}



