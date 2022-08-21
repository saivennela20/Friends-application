import { UserActionType } from "../Actions/user-action";
import AppState from '../State';
import * as userUtil from '../../js/user/userUtil';

const reducer =  (state = AppState, action) =>{
  const type = action.type;
  let user ;
  switch(type){
    case UserActionType.SIGN_IN:
      user = action.payload.user
      //need to check cookie is set or not and need to redirect
      break;
    case UserActionType.SIGN_UP:
      user = action.payload.user
      //need to show proper error message based on response
      break;
    default:
      user=state.user;
      break;

  }
  return Object.assign({},state,{user});
} 

export default reducer;