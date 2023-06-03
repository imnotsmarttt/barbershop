import s from './AdminNav.module.css'
import {Grid} from "@mui/material";
import AdminNavItem from "./AdminNavItem";


function AdminNav() {
    return (
        <Grid item xs={2} className={s.wrapper}>
            <Grid container className={s.nav_items__wrapper}>
                <h3 style={{textAlign: 'center', width: '100%'}}>Goliath</h3>
                <ul className={s.nav_items}>
                    <AdminNavItem link='visits' title='Записи' />
                    <AdminNavItem link='employee' title='Працівники' />
                    <AdminNavItem link='services' title='Послуги' />
                    <AdminNavItem link='branch' title='Філіал' />

                    <li className={s.item}>
                        <button className={s.btn__logout}>Вийти</button>
                    </li>
                </ul>
            </Grid>
        </Grid>
    )
}

export default AdminNav