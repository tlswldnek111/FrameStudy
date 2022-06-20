import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
    const barStyle={
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
    };
  return (
    <>
        <nav
        style={barStyle}>
        <Link to="/">Home</Link> |{"  "}
        <Link to="/intro">Intro</Link> |{"  "}
        <Link to="/dept">List</Link> |{"  "}
        <Link to="/dept/add">Add</Link> |{"  "}
        <Link to="/login">Login</Link> |{"  "}
        
    </nav>
  </>
  )
}

export default Navbar