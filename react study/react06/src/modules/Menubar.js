import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
function Menubar() {
  return (
    <>


    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">누가밤밥바</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
               <Link className="nav-link active" aria-current="page"to="/intro">Intro</Link>
              </li>
              <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="/dept">List</Link>
              </li>
              <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="/dept/add">Add</Link>
              </li>
              <li className="nav-item">
               <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
              </li>
            </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  </>
  )
}

export default Menubar