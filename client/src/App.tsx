import React from 'react';
import './App.css';

import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Auth from "./Pages/Auth/Auth";
import Admin from "./Pages/Admin/Admin";
import VisitsContent from "./Pages/Admin/VisitsContent";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='a' element={<Auth />}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register />}/>
                    </Route>
                    <Route path='admin' element={<Admin />}>
                        <Route path='visits' element={<VisitsContent />} />
                    </Route>


                    <Route path='' element={<div>Main page</div>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
