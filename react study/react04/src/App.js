import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
import Home from './pages/Home';
import Emp from './pages/Emp';
import Dept from './pages/Dept';
import Login from './pages/Login';
function App(){
  return (
    
   <Router>
    <nav>
      <Link to="/"> menu1 </Link>
      <Link to="/emp"> menu2 </Link>
      <Link to="/dept"> menu3 </Link>
      <Link to="/login"> menu4 </Link>
    </nav>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/emp" element={<Emp/>}/>
          <Route path="/dept" element={<Dept/>}/>
          <Route path="/login" element={<Login/>}/>
      </Routes>
   </Router>
  );
}

export default App;