import AdminTable from "./AdminTable/AdminTable";
import {Grid} from "@mui/material";
import s from './Admin.module.css'
import AdminStatistic from "./AdminStatistic/AdminStatistic";

type PropsType = {
    headerTitles: string[]
    rows: object[],
    rowsCount: number;
    pageSize: number
}

function AdminMainContent(props: PropsType) {
    return (
        <Grid className={s.main}>
            <AdminStatistic/>
            <AdminTable
                rows={props.rows}
                headerTitles={props.headerTitles}
                rowsCount={props.rowsCount}
                pageSize={props.pageSize}
            />
        </Grid>
    )
}

export default AdminMainContent