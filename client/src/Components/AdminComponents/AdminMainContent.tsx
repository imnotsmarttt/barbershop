import TableSection from "./Table/TableSection";
import {Grid} from "@mui/material";
import s from './Admin.module.css'
import StatisticSection from "./Statistic/StatisticSection";
import AdminHeader from "./AdminHeader/AdminHeader";

function AdminMainContent() {
    return (
        <Grid container item xs={10} className={s.main_wrapper}>
            <AdminHeader />
            <StatisticSection />
            <TableSection/>
        </Grid>
    )
}

export default AdminMainContent