import {Grid} from "@mui/material";
import s from './Statistic.module.css'

function StatisticItem() {
    return (
        <Grid item xs={3.5} className={s.statistic__item}>
            <h3 className={s.value}>100</h3>
            <p className={s.name}>Продаж</p>
        </Grid>
    )
}

export default StatisticItem