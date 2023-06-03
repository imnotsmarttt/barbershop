import s from "./Table.module.css";
import {Grid} from "@mui/material";

function TableSectionTop() {
    return (
        <Grid container item xs={12} className={s.header_wrapper}>
            <Grid item xs={6} className={s.left_item}>
                <h3>Table title</h3>
            </Grid>
            <Grid container item xs={6} className={s.right_item}>
                <input
                    placeholder='Пошук'
                    className={s.search_input}
                />
                <button className={s.filter_btn}>
                    Фільтри
                </button>
            </Grid>
        </Grid>
    )
}

export default TableSectionTop