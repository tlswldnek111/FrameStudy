import { useEffect, useState } from "react";

export default function App06 (props){
    console.log('loaing..');
    const [msg,setMsg] = useState(1);
    const [msg2,setMsg2] = useState("2222");
    useEffect(function(){
        setTimeout(() => {
                setMsg(msg+1);
        }, 3000);
    },[msg,msg2]);
    const btnHandler = () => {
        
        setMsg(msg+1);
    };
    const btnHandler2 = () => {
        
        setMsg2(new String('이벤트 발생'.concat('asd')));
    };
    return(
        <div>
            <h1>{msg}={msg2}</h1>
            <button onClick={btnHandler}>버튼</button>
            <button onClick={btnHandler2}>버튼</button>
        </div>
    );
}