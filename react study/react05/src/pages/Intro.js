import { useEffect, useState } from "react";

export default function Intro(props){
    const [data,setData] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
          .then((res) => res.json())
          .then((data) => setData(data));
     }, []);

    return (
    <>
        <h1>Intro page</h1>
        <ul className="list-group">
            {data.map((ele,idx)=>(
                <li className="list-group-item" key={ele.id}>{ele.title}</li>
            ))}
                
         </ul>
    </>
    );
}