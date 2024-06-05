import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './page/Login';
import { SignUp } from './page/SignUp';
import { Home } from './page/backOffices/Home';
import { History } from './page/backOffices/history';
import { AccessPage } from './page/main/AccessPage';
import { Employee } from './page/backOffices/employee';
import { UserPages } from './page/backOffices/User.pages';
import { CodePage } from './page/backOffices/Code';
import { CompaniePage } from './page/backOffices/CompaniePage';


function App() {
 return(
  <div className="Aplicacion">
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="signUp" element={<SignUp />}></Route>
        <Route path="homen" element={<Home />}></Route>
        <Route path="history" element={<History />}></Route>
        <Route path="access" element={<AccessPage />}></Route>
        <Route path="agente" element={<Employee />}></Route>
        <Route path="user" element={<UserPages />}></Route>
        <Route path="code" element={<CodePage />}></Route>
        <Route path="companie" element={<CompaniePage />}></Route>
      </Routes>
    </Router>
  </div>
 )
}

export default App;
