function App22({obj}){
    const clickFunc= ()=>{
        console.log('클릭');
    }
    const clickFunc2= function(){
        console.log('클릭');
    }
    return (
    <>
        <h2 >{obj.msg} {obj.msg2}</h2>
        <button onClick={()=>clickFunc()}>클릭</button>
        <button onClick={clickFunc2}>클릭2</button>
    </>
    );
}

function App222(){
    
    return(
        <div>
            <h1>파라미터 전달</h1>
            <button onClick={(e)=>{
                console.log("gd",e.target);
            }}>asd</button>
        </div>
    );
}

export default function App02(){
    const msgs={
        msg:"환영합니다", 
        msg2:"정말",
        
    };
    return (
        <>
            <h1>환영메시지</h1>
            <App222 obj={msgs}/>
        </>
    );
}