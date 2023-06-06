import {Grid} from "@mui/material";
import s from './Table.module.css'
import TableSectionTop from "./TableSectionTop";
import AdminTable from "./AdminTable";

type PropsType = {
    headerTitles: string[];
    rows: object[];

    rowsCount: number;
    pageSize: number
}

function TableSection(props: PropsType) {
    return (
        <Grid container item xs={12} className={s.wrapper}>
            <TableSectionTop  />
            <AdminTable rows={props.rows} headerTitles={props.headerTitles} rowsCount={props.rowsCount} pageSize={props.pageSize}/>
        </Grid>
    )
}

export default TableSection
