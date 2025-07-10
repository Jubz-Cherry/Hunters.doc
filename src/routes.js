import './App.js';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function AppRoutes() {
    return(
        <BrowserRouter>
        <Router>
            <Route path="/" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
        </Router>
        </BrowserRouter>
    )
}

export default AppRoutes;