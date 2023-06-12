import AdminTable from "./AdminTable/AdminTable";
import {Grid} from "@mui/material";
import s from './Admin.module.css'
import AdminStatistic from "./AdminStatistic/AdminStatistic";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

interface RowType {
    id: number;
    [key: string]: string | number
}

type PropsType = {
    headerTitles: string[];
    rows: RowType[];
    rowsCount: number;
    pageSize: number

    toggleDeleteModal: ActionCreatorWithPayload<{ id?: number }>

    tableTitle: string;
}


function AdminMainContent(props: PropsType) {
    return (
        <Grid className={s.main}>
            <AdminStatistic/>
            <AdminTable
                rows={props.rows}
                headerTitles={props.headerTitles}
                itemCount={props.rowsCount}
                pageSize={props.pageSize}
                toggleDeleteModal={props.toggleDeleteModal}

                tableTitle={props.tableTitle}
            />
        </Grid>
    )
}

export default AdminMainContent