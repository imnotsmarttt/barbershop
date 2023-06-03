import {Grid} from "@mui/material";
import StatisticItem from "./StatisticItem";
import s from './Statistic.module.css'

function StatisticSection() {
    return (
        <Grid container item className={s.wrapper}>
            <StatisticItem />
            <StatisticItem />
            <StatisticItem />
        </Grid>
    )
}

export default StatisticSection
