import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import { Container, Form,Button} from 'react-bootstrap';
import axios from 'axios';


function DeptOne() {
  let navigate = useNavigate();
  const [bean,setBean] =useState({});
  const [edit,setEdit]=useState(false);
  let {deptno} = useParams();
  useEffect(()=>{
    axios.get('http://localhost:8080/api/dept/'+deptno)
      .then(e=>{
        setBean(e.data);
  });
    
  },[])

  const editHandler=(e)=>{
    e.preventDefault();
    setEdit(!edit);
    if(edit){//edit이 true일 경우!
      axios.put('http://localhost:8080/api/dept/'+bean.deptno,bean)
      .then(e=>{
        if(e.data.result){//성공
          navigate('/dept');
        }else{//실패

        }
      });
    }
  };
  const backHandler=()=>{
    navigate(-1);
  }
  // const dnameHandler=(e)=>{
  //  setBean({...bean,dname:e.target.value});//기존 bean에 추가적으로 dname을 바꿔준다.
  // }
  // const locHandler=(e)=>{
  //   setBean({...bean,loc:e.target.value});//기존 bean에 추가적으로 loc을 바꿔준다.
  //  }
  
  //dname 혹은 loc 값 수정할때. 위의 두 함수를 합쳐놓은거임
   const inputHandler=(e)=>{
    setBean({...bean,[e.target.name]:e.target.value});
   }
//삭제버튼 누를때
   const deleteHandler=(e)=>{
    axios.delete('http://localhost:8080/api/dept/'+bean.deptno)
        .then(e=>e.status==200?navigate('/dept'):window.alert('삭제 실패'))
        .catch(e=>window.alert('삭제실패'))//exception이 발생할경우 catch를 통해 값을 출력한다.
   }
  return (
    <Container>
        <h1>{edit?'수정페이지':'상세보기'}</h1>
        <Form onSubmit={editHandler}>
      <Form.Group className="mb-3" controlId="deptno">
        <Form.Label>deptno</Form.Label>
        <Form.Control type="text" placeholder="deptno" name="deptno" value={bean.deptno} readOnly={true}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="dname">
        <Form.Label>dname</Form.Label>
        <Form.Control type="text" placeholder="dname" name="dname" 
              value={bean.dname} readOnly={!edit} 
              onChange={inputHandler}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="loc">
        <Form.Label>loc</Form.Label>
        <Form.Control type="text" 
              name="loc" 
              value={bean.loc} 
              readOnly={!edit} 
              onChange={inputHandler}
              />
      </Form.Group>
      <Button variant="primary" type="submit">수정</Button>
      {edit?
      <Button variant="dafault" type="reset">취소</Button>
      :
      <Button variant="danger" type="button" onClick={deleteHandler}>삭제</Button>
      }
      <Button variant="default" type="button" onClick={backHandler}>뒤로</Button>
    </Form>
    </Container>
    
  )
}

export default DeptOne