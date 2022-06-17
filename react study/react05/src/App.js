import './App.css';
import Home from './pages/Home';
import Intro from './pages/Intro';
import DeptList from './pages/DeptList';
import Login from './pages/Login';
import DeptAdd from './pages/DeptAdd';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Mnav from './modules/Mnav';

function App() {
  return (
    <BrowserRouter>
    <Mnav/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/intro" element={<Intro/>}/>
      <Route path="/dept" element={<DeptList/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/add" element={<DeptAdd/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
