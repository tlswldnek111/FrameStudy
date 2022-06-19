import {useEffect, useState} from "react";
import { Link,useLocation } from "react-router-dom";
export default function DeptList(props){
    const [arr,setArr]=useState([]); 
    const location = useLocation();
   const {num,dname}=location.state;
    console.log(num,dname);
    // const {title} = location.state;
    useEffect(()=>{
        fetch('http://localhost:8080/api/dept/') //프로미스객체반환
        .then((res)=>(res.json()))
        .then((json)=>setArr(json))
        ;
    }, []);


    return (
    <>
        <h1>DeptList</h1>
        <h1>{num} {dname}</h1>
        <ul className="list-group">
        {arr.map((ele)=>(
                <li className="list-group-item" key={ele.deptno}>{ele.dname}</li>
            ))}

        </ul>
        <Link to="/add" className="btn btn-primary btn-block">입력</Link>
    </>
    );
} 