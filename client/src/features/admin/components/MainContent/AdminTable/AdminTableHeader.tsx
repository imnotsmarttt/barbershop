import {Button, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import s from "./AdminTable.module.css";
import {NavLink} from "react-router-dom";


type PropsType = {
    tableTitle: string
}

function AdminTableHeader(props: PropsType) {
    return (

        <Grid container item xs={12} className={s.table_header}>
            <Grid container item xs={1} className={s.table_header__create_section}>
                <NavLink to='create' className={s.create_button}>
                    <AddIcon/>
                </NavLink>
            </Grid>
            <Grid item xs={5} className={s.table_header__left_item}>
                <h3>{props.tableTitle}</h3>
            </Grid>
            <Grid container item xs={6} className={s.table_header__filter_section}>
                <input placeholder='Пошук' className={s.search_input}/>
                <button className={s.button_filters}>
                    Фільтри
                </button>
            </Grid>
        </Grid>
    )
}

export default AdminTableHeader