import {Grid} from "@mui/material";
import AdminTableHeader from "./AdminTableHeader";
import AdminTableBody from "./AdminTableBody";

import s from './AdminTable.module.css'
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";


export type TableRowType = {
    id: number;
    [key: string]: string | number
}

type PropsType = {
    headerTitles: string[];
    rows: TableRowType[];
    itemCount: number;
    pageSize: number

    toggleDeleteModal: ActionCreatorWithPayload<{ id?: number }>

    tableTitle: string;
}

function AdminTable(props: PropsType) {
    return (
        <Grid container item xs={12} className={s.table}>
            <AdminTableHeader tableTitle={props.tableTitle}  />
            <AdminTableBody
                rows={props.rows}
                headerTitles={props.headerTitles}
                itemCount={props.itemCount}
                pageSize={props.pageSize}
                toggleDeleteModal={props.toggleDeleteModal}
            />
        </Grid>
    )
}

export default AdminTable
