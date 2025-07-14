import './App.js';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import Login from './components/Login';


function AppRoutes() {
    return(
        <BrowserRouter>
        <Router>
            <Route path="/" element={<Login/>}/>
        </Router>
        </BrowserRouter>
    )
}

export default AppRoutes;