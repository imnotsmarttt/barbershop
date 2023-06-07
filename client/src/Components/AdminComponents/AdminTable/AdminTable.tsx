import {Grid} from "@mui/material";
import AdminTableHeader from "./AdminTableHeader";
import AdminTableBody from "./AdminTableBody";

import s from './AdminTable.module.css'


type PropsType = {
    headerTitles: string[];
    rows: object[];
    rowsCount: number;
    pageSize: number

}

function AdminTable(props: PropsType) {
    return (
        <Grid container item xs={12} className={s.table}>
            <AdminTableHeader  />
            <AdminTableBody
                rows={props.rows}
                headerTitles={props.headerTitles}
                rowsCount={props.rowsCount}
                pageSize={props.pageSize}
            />
        </Grid>
    )
}

export default AdminTable
