import { createContext } from "react";
export const LOGIN="login";
export const LOGOUT="logout"

export const initialState={
    result:false,
    username:'guest'
  };
export const reducer=(state,action)=>{
  switch(action.type){
    case LOGIN:
      return {...state,result:true,username:action.username};
    case LOGOUT:
      return {...state,result:false,username:'guest'};
    default:
      return state;
  }
  
  };
  
const UserCtxt=createContext('guest');//context 객체를 만든다.
export default UserCtxt;