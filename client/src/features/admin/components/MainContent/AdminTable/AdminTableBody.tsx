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

import s from './AdminTable.module.css'

import TablePagination from "./TablePagination";

type Props = {
    headerTitles: string[];
    rows: object[];

    rowsCount: number;
    pageSize: number
}


function AdminTableBody(props: Props) {
    const {rows, headerTitles} = props

    const tableBodyRows = rows.map(row => {
        const cells = []
        for (const value of Object.values(row)) {
            cells.push(value)
        }
        return (
            <TableRow className={s._row} key={cells[0]}>
                {cells.map(cell => <TableCell className={s.cell} key={cell}>{cell}</TableCell>)}
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

            {(props.pageSize <= props.rowsCount && props.rowsCount !== 0) && <TablePagination rowsCount={props.rowsCount} pageSize={props.pageSize}/>}
        </Grid>
    )
}

export default AdminTableBody