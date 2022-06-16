import { useState } from "react";

export default function App04() {
    // let obj=useState('입력');//초기값
    // let msg=obj[0];//변경될값
    // let setMsg=obj[1];//setter

    
    // const [obj,setObj]=useState({msg:'입력'},{msg2:'하세요'})
    // const inputId=(e)=>{
    //     console.log(e.target.value);
    //     setObj({...obj,msg:e.target.value});
    // };
    // const inputPw=(e)=>{
    //     console.log(e.target.value);
    //     setObj({...obj,msg2:e.target.value});
    // };

    const [msg,setMsg]=useState('입력');
    const [msg2,setMsg2]=useState('하세요');
    const [chk,setChk]=useState(true);
    
    const inputId=(e)=>{
        console.log(e.target.value);
        setMsg(e.target.value);
    };
    const inputPw=(e)=>{
        setMsg2(e.target.value);
    };
    const inputHander=(e)=>{
        console.log(e.target.value,e.target.name);
        setChk(!chk);
    };
    const formSubmit=(e)=>{
        e.preventDefault();//페이지이동을 막는다.
        //element값을 아래와같이 event 객체로부터 받아올수있음.
        console.log(e.target.name, e.target.value);
    }
    
    return(
        <>
        <h1>회원가입</h1>
        <form onSubmit={formSubmit}>
            <label> id : 
                <input name="id" onChange={inputId} value={msg} />
            </label>
            <label> pw : 
                <input name="pw" onChange={inputPw} value={msg2}/>
            </label>
            
            <div>
                <input type='submit' value='전달'/>
            </div>
            
            <label>
                <input type="checkbox"  onChange={inputHander} value={chk}/>
            </label>

        </form>
        </>
    );
}