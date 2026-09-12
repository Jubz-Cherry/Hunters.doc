import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MonsterDetails from './pages/MonstersPage/monsterDetails';
import Profile from './pages/Profile';
import Guns from './pages/Guns';
import GunsDetails from './pages/Gunspage/gunsDetails';
import ResetPassword from './pages/ResetPassword';
import Forgotpassword from './pages/ForgotPassword';
import VerifyCode from './pages/Verifycode';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ForgotPassword" element={<Forgotpassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/VerifyCode" element={<VerifyCode />} />
      <Route path="/monsters/:name" element={<MonsterDetails />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/guns" element={<Guns />}/>
      <Route path="/guns/:name" element={<GunsDetails />}/>
    </Routes>
  );
}

export default App;
