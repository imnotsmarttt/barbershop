import {Grid} from "@mui/material";
import AdminStatisticItem from "./AdminStatisticItem";
import s from './AdminStatistic.module.css'

function AdminStatistic() {
    return (
        <Grid container item className={s.statistic}>
            <AdminStatisticItem />
            <AdminStatisticItem />
            <AdminStatisticItem />
        </Grid>
    )
}

export default AdminStatistic
