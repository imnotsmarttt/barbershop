import {Grid} from "@mui/material";
import s from "./AdminTable.module.css";

function AdminTableHeader() {
    return (
        <Grid container item xs={12} className={s.table_header}>
            <Grid item xs={6} className={s.table_header__left_item}>
                <h3>Table title</h3>
            </Grid>
            <Grid container item xs={6} className={s.table_header__right_item}>
                <input placeholder='Пошук' className={s.search_input}/>
                <button className={s.button_filters}>
                    Фільтри
                </button>
            </Grid>
        </Grid>
    )
}

export default AdminTableHeader