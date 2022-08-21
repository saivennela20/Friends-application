export const UserActionType ={
  SIGN_UP: "[User] SignUp",
  SIGN_IN: "[User] SignIn"
};


export const signUp = (payload) => {
  return{
    type: UserActionType.SIGN_UP,
    payload
  }
}

export const signIn = (payload) => {
  return{
    type: UserActionType.SIGN_IN,
    payload
  }
}

