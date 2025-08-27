import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MonsterDetails from './pages/MonstersPage/monsterDetails';
import Notes from './pages/Notes';
import Guns from './pages/Guns';
import GunsDetails from './pages/Gunspage/gunsDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/monsters/:name" element={<MonsterDetails />}/>
      <Route path="/notes" element={<Notes />}/>
      <Route path="/guns" element={<Guns />}/>
      <Route path="/guns/:name" element={<GunsDetails />}/>
    </Routes>
  );
}

export default App;
