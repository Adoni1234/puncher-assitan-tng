import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './page/Login';
import { SignUp } from './page/SignUp';
import { Home } from './page/backOffices/Home';
import { History } from './page/backOffices/history';


function App() {
 return(
  <div className="Aplicacion">
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="signUp" element={<SignUp />}></Route>
        <Route path="homen" element={<Home />}></Route>
        <Route path="history" element={<History />}></Route>
      </Routes>
    </Router>
  </div>
 )
}

export default App;
