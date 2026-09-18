import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MonsterDetails from './pages/MonstersPage/monsterDetails';
import Profile from './pages/Profile';
import Guns from './pages/Guns';
import GunsDetails from './pages/Gunspage/gunsDetails';
import Marks from './pages/Marks';
import MarksDetails from './pages/Markspage';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import { PreferencesProvider } from './preferences';

function App() {
  return (
    <PreferencesProvider><Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />

      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/monsters/:name" element={<PrivateRoute><MonsterDetails /></PrivateRoute>}/>
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
      <Route path="/guns" element={<PrivateRoute><Guns /></PrivateRoute>}/>
      <Route path="/guns/:name" element={<PrivateRoute><GunsDetails /></PrivateRoute>}/>
      <Route path="/marks" element={<PrivateRoute><Marks /></PrivateRoute>}/>
      <Route path="/marks/:name" element={<PrivateRoute><MarksDetails /></PrivateRoute>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></PreferencesProvider>
  );
}

export default App;
