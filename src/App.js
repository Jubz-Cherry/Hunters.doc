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
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />

      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/monsters/:name" element={<PrivateRoute><MonsterDetails /></PrivateRoute>}/>
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
      <Route path="/guns" element={<PrivateRoute><Guns /></PrivateRoute>}/>
      <Route path="/guns/:name" element={<PrivateRoute><GunsDetails /></PrivateRoute>}/>
    </Routes>
  );
}

export default App;
