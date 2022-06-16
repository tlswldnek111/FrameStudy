import { useState, createContext, useContext, useEffect } from "react";

var UserContext;
function App777({setMsg1}){
    const msg = useContext(UserContext);
    const [msg2,setMsg2] = useState('손좌');
    
    const btnHandler=()=>{
       setMsg1('ABCD');
    };
    const btnHandler2=()=>{
      setMsg1('바꿈');
    };
    return (
        <div>
            <h1>{msg}</h1>
            <button onClick={btnHandler}>브어트언</button>
            <button onClick={btnHandler2}>손좌</button>
        </div>
    );
}
function App77({setMsg1}){
    useEffect(function(){
        setMsg1('ABCDDDDD');
    },[]);
    return(
        <div> 
            <App777 setMsg1={setMsg1}/>
        </div>
    );
}
export default function App7(){
    const [msg1,setMsg1] = useState('abcddddddd');
    UserContext = createContext();
    return (
        <div>
             <UserContext.Provider value={msg1}>
                <App77  setMsg1={setMsg1}/>
            </UserContext.Provider>
        </div>
    );
}