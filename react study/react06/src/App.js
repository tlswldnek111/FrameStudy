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
import Navbar from "./modules/Navbar";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
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
  );
}

export default App;
