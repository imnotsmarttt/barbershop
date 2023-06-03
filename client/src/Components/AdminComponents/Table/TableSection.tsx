import {Grid} from "@mui/material";
import s from './Table.module.css'
import TableSectionTop from "./TableSectionTop";
import AdminTable from "./AdminTable";


function TableSection() {
    return (
        <Grid container item xs={12} className={s.wrapper}>
            <TableSectionTop />
            <AdminTable />
        </Grid>
    )
}

export default TableSection
