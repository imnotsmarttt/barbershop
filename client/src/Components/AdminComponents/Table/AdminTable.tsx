import {
    Grid, Pagination, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import s from './Table.module.css'
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

type Props = {
    headerTitles: string[];
    rows: object[];

    rowsCount: number;
    pageSize: number
}


function AdminTable(props: Props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
    const pages = Math.ceil(props.rowsCount / props.pageSize)

    const {rows, headerTitles} = props
    const tableBodyRows = rows.map(row => {
        const cells = []
        for (const value of Object.values(row)) {
            cells.push(value)
        }

        return (
            <TableRow className={s.table__row} key={cells[0]}>
                {cells.map(cell => <TableCell sx={{padding: '12px 24px'}} key={cell}>{cell}</TableCell>)}
            </TableRow>
        )
    })

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('page', `${value}`)
        setSearchParams(searchParams)
        setPage(value);
    };

    return (
        <Grid container className={s.table__wrapper}>
            <TableContainer className={s.table__container}>
                <Table>
                    <TableHead className={s.table__header}>
                        <TableRow>
                            {headerTitles.map(cell => <TableCell
                                key={cell}
                                className={s.table__cell}
                            >{cell}</TableCell>)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableBodyRows}
                    </TableBody>
                </Table>
            </TableContainer>

            {props.pageSize <= props.rowsCount && <Stack spacing={2} className={s.pagination__wrapper}>
                <Pagination count={pages} onChange={handlePagination} page={page}/>
            </Stack>}

        </Grid>
    )
}

export default AdminTable