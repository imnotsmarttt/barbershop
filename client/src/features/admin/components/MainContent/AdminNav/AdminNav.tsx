import {Grid} from "@mui/material";
import AdminNavItem from "./AdminNavItem";

import {useAppDispatch} from "hooks/store";
import {logout} from 'store/slices/auth'

import s from './AdminNav.module.css'


function AdminNav() {
    const dispatch = useAppDispatch()
    const handleLogout = () => dispatch(logout())

    return (
        <Grid item xs={2} className={s.nav}>
            <Grid container className={s.container}>
                <h3 className={s.container__title}>Goliath</h3>
                <ul className={s.items}>
                    <AdminNavItem link='visits' title='Записи' />
                    <AdminNavItem link='employee' title='Працівники' />
                    <AdminNavItem link='services' title='Послуги' />
                    <AdminNavItem link='branch' title='Філіал' />

                    <li className={s.item}>
                        <button className={s.btn_logout} onClick={handleLogout}>Вийти</button>
                    </li>
                </ul>
            </Grid>
        </Grid>
    )
}

export default AdminNav