import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CardGroup,Col,Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
function DeptList() {
  const [arr,setArr]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8080/api/dept/')
    .then(e=>{setArr(e.data)})
  },[]);
  

  return (
    <>
    <Container>
    <h1>List Page</h1>
    <CardGroup>
      <Row xs={2} md={3}>
      {arr.map((bean,idx)=>(
       <Col key={idx}>
       <Card >
        <Card.Body>
          <Card.Title >{bean.deptno}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{bean.dname}</Card.Subtitle>
          <Card.Text>{bean.loc}</Card.Text>
          <Card.Link as={Link} to={"/dept/"+bean.deptno} >Go Detail</Card.Link>
        </Card.Body>
      </Card>
      </Col>
     
    ))}
    </Row>
  </CardGroup>
  </Container>
</>
  )
}

export default DeptList