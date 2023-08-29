import React,{useState} from 'react'
import AuthContext from './auth-context';

export default function AuthState(props) {
 
    const [Token, setToken] = useState(null);
    
  let userLogIn=localStorage.getItem('idToken')?true:false
    const loginhandler=(token)=>{
        
            setToken(token);
        
    }
    const logouthandler=(token)=>{
        setToken(null);
        localStorage.clear();
        userLogIn=false;
       
    }

   const contextvalue={
    islogin: userLogIn,
    token:Token,
    login:loginhandler,
    logout:logouthandler
   }
  return (
    <AuthContext.Provider value={contextvalue}>
{props.children}
    </AuthContext.Provider>
   
  )
}