import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import LoginPage from "./pages/LoginPage";
import DeptList from "./pages/DeptList";
import DeptOne from "./pages/DeptOne";
import DeptAdd from "./pages/DeptAdd";
import JoinPage from "./pages/JoinPage";
import Menubar from "./modules/Menubar";
import {useReducer, useState } from "react";
import UserCtxt,{reducer,initialState} from "./modules/store";

// const UserCtxt=createContext('guest');//context 객체를 만든다.

function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <UserCtxt.Provider value={{state,dispatch}}>
      <BrowserRouter>
      <Menubar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/dept" element={<DeptList />} />
        <Route path="/dept/:deptno" element={<DeptOne />} />
        <Route path="/dept/add" element={<DeptAdd />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
   </UserCtxt.Provider>
  );
}

export default App;
