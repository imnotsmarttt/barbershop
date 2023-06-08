import React, {useEffect} from 'react';
import './App.css';

import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Auth from "./Pages/Auth/Auth";
import Admin from "./Pages/Admin/Admin";
import AdminVisits from "./Pages/Admin/AdminVisits";
import {useAppDispatch} from "./hook";
import {refreshTokensThunk} from "./store/slices/auth";
import AuthComponent from "./HOC/AuthComponent";

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const token = localStorage.getItem('refreshToken')
        if (token) {
            dispatch(refreshTokensThunk())
        }

        const tokenRefreshInterval = setInterval(() => {
            if (token) {
                dispatch(refreshTokensThunk())
            }
        }, 1000 * 60 * 12);

        return () => {
            clearInterval(tokenRefreshInterval);
        };

    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='a' element={<Auth/>}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register/>}/>
                    </Route>
                    <Route path='admin' element={<AuthComponent children={<Admin/>}/>}>
                        <Route path='visits' element={<AdminVisits/>}/>
                    </Route>


                    <Route path='' element={<div>Main page</div>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
