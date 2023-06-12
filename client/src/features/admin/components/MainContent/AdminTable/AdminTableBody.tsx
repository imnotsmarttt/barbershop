import React from "react";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import s from './AdminTable.module.css'

import TablePagination from "./TablePagination";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "hooks/store";
import {TableRowType} from "./AdminTable";


type Props = {
    headerTitles: string[];
    rows: TableRowType[];

    itemCount: number;
    pageSize: number

    toggleDeleteModal: ActionCreatorWithPayload<{ id?: number }>
}


function AdminTableBody(props: Props) {
    const {rows, headerTitles, itemCount, pageSize, toggleDeleteModal} = props
    const dispatch = useAppDispatch()

    // generate html rows for table
    const tableBodyRows = rows.map(row => {
        const cells = Object.values(row)

        return (
            <TableRow className={s._row} key={cells[0]}>
                {cells.map(cell => <TableCell className={s.cell} key={cell}>{cell}</TableCell>)}
                <button
                    className={`${s.cell__delete_button} ${s.cell}`}
                    onClick={() => {
                        dispatch(toggleDeleteModal({id: row.id}))
                    }}>
                    <DeleteIcon/>
                </button>
            </TableRow>
        )
    })

    return (
        <Grid container className={s.table_body}>
            <TableContainer className={s.body_container}>
                <Table>
                    <TableHead className={s.body_header}>
                        <TableRow>
                            {headerTitles.map(cell => <TableCell
                                key={cell}
                                className={s.cell}
                            >{cell}</TableCell>)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableBodyRows}
                    </TableBody>
                </Table>
            </TableContainer>
            {!tableBodyRows.length && <p className='text text_center'>Нічого не знайдено</p>}
            {
                (pageSize <= itemCount && itemCount !== 0) &&
                <TablePagination rowsCount={itemCount} pageSize={pageSize}/>
            }
        </Grid>
    )
}

export default AdminTableBody