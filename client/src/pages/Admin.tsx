import AdminNav from "features/admin/components/MainContent/AdminNav/AdminNav";
import {Grid} from "@mui/material";
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";

function Admin() {
    const {user} = useSelector((state: RootStateType) => state.auth)
    if (user?.role !== 'ADMIN') {
        return <Navigate to='/' />
    }
    return (
        <Grid container className='container'>
            <AdminNav/>
            <Outlet/>
        </Grid>
    )
}

export default Admin