import {Grid} from "@mui/material";
import s from './AdminStatistic.module.css'

function AdminStatisticItem() {
    return (
        <Grid item xs={3.5} className={s.item}>
            <h3 className={s.item__value}>100</h3>
            <p className={s.item__name}>Продаж</p>
        </Grid>
    )
}

export default AdminStatisticItem