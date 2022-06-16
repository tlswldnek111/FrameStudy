import React from "react";

export default class App01 extends React.Component{
    //생성자에서 props를 받는다. 
    constructor(props){
        super(props);//React.Component를 상속받기때문에 해줘야함
        this.msgs=this.props.msg;
    }
    clickFunc(){
        console.log('method...',this.props);
    }
    render(){   
        return (
            <>
                <h1>CLASS형 이벤트</h1>
                <button onClick={()=>{console.log('arrow function',this.props);}}>cliik1</button>
                <button onClick={function(){
                                    console.log('일반함수',this.props);
                                
                                }.bind(this)}>cliikFunc2</button>
                <button onClick={this.clickFunc.bind(this)}>cliikFunc3</button>
            </>
        )
    };
}