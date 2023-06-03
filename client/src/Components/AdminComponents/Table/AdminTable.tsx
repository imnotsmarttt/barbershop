import {
    Grid, Pagination, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow,
} from "@mui/material";

import s from './Table.module.css'
import {useState} from "react";

type Props = {
    headerTitles: string[]
    rows: object[],
}


function AdminTable() {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const rows = [
        {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
        {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
        {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
        {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
        {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
        {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
        {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
        {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
        {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65},
        {id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    ];

    const tableHeaderRows = []
    for (const key of Object.keys(rows[0])) {
        tableHeaderRows.push(key)
    }

    const tableBodyRows = rows.map(row => {
        const cells = []
        for (const value of Object.values(row)) {
            cells.push(value)
        }

        return (
            <TableRow className={s.table__row}>
                {cells.map(cell => <TableCell sx={{padding: '12px 24px'}}>{cell}</TableCell>)}
            </TableRow>
        )
    })

    const tableCellStyle = {
        padding: '12px 24px',
        borderBottom: "none"
    }
    const tableHeaderStyle = {
        background: "#F2F2F2",
    }


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container className={s.table__wrapper}>
            <TableContainer className={s.table__container}>
                <Table>
                    <TableHead sx={tableHeaderStyle}>
                        <TableRow>
                            {tableHeaderRows.map(cell => <TableCell
                                sx={tableCellStyle}
                                className={s.table__cell}
                            >{cell}</TableCell>)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableBodyRows}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2} className={s.pagination__wrapper}>
                <Pagination count={10}/>
            </Stack>
        </Grid>
    )
}

export default AdminTable