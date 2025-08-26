import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MonsterDetails from './pages/MonstersPage/monsterDetails';
import Notes from './pages/Notes';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/monsters/:name" element={<MonsterDetails />}/>
      <Route path="/notes" element={<Notes />}/>
    </Routes>
  );
}

export default App;
