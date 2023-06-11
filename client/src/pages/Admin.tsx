import {Grid} from "@mui/material";
import {Navigate, Outlet} from "react-router-dom";
import AdminNav from "features/admin/components/MainContent/AdminNav/AdminNav";
import AdminHeader from "features/admin/components/MainContent/AdminHeader/AdminHeader";

import s from "features/admin/components/MainContent/Admin.module.css";

import {RootStateType} from "types/store/store";

import {useSelector} from "react-redux";

function Admin() {
    const {user} = useSelector((state: RootStateType) => state.auth)
    if (user?.role !== 'ADMIN') {
        return <Navigate to='/'/>
    }
    return (
        <Grid container className='container'>
            <AdminNav/>
            <Grid container item xs={10} className={s.main__container}>
                <AdminHeader user={user}/>
                <Outlet/>
            </Grid>
        </Grid>
    )
}

export default Admin