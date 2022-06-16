// export default ()=>{
//     <h1>화살표 함수</h1>
// }
const Li=(props)=> <li >{props.msg}</li>;

const App03= (props)=>{
    console.log(props);
    const arr=['item1','item2','item3'];
    const showList = ()=>{
     return arr.map(function(ele,idx){
        return <Li msg={ele} key={idx}/>;
        // return <li key={idx}>{ele}</li>
     }) ;  
    };
  
    return(
        <>
        <h1>화살표 함수</h1>
        <ul>
            {showList()}
        </ul>
        </>
    );
};
export default App03;