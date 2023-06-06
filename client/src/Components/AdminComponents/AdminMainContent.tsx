import TableSection from "./Table/TableSection";
import {Grid} from "@mui/material";
import s from './Admin.module.css'
import StatisticSection from "./Statistic/StatisticSection";
import AdminHeader from "./AdminHeader/AdminHeader";

type PropsType = {
    headerTitles: string[]
    rows: object[],
    rowsCount: number;
    pageSize: number
}

function AdminMainContent(props: PropsType) {
    return (
        <Grid container item xs={10} className={s.main_wrapper}>
            <AdminHeader />
            <StatisticSection />
            <TableSection rows={props.rows} headerTitles={props.headerTitles} rowsCount={props.rowsCount} pageSize={props.pageSize}/>
        </Grid>
    )
}

export default AdminMainContent