import s from "./AdminTable.module.css";
import {Pagination, Stack} from "@mui/material";
import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";

type PropsType = {
    rowsCount: number;
    pageSize: number
}

function TablePagination(props: PropsType) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1"));

    const {rowsCount, pageSize} = props
    const pages = Math.ceil(rowsCount / pageSize)

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('page', `${value}`)
        setSearchParams(searchParams)
        setPage(value);
    };


    return (
        <Stack spacing={2} className={s.table_pagination__wrapper}>
            <Pagination count={pages} onChange={handlePagination} page={page}/>
        </Stack>
    )
}

export default TablePagination