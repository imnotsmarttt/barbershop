import AdminMainContent from "../components/MainContent/AdminMainContent";
import {useAppDispatch} from "hooks/store";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {fetchEmployeeList} from "store/slices/admin";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";
import {dateFormatInstance} from "lib/intl";

function AdminEmployee() {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchEmployeeList({query: searchParams.toString()}))
    }, [dispatch, searchParams])

    const {employeeList, itemCount, pageSize} = useSelector((state: RootStateType) => state.admin.employee)

    const headerTitles = ['ID', 'ПІБ', 'Номер телефону', 'Посада', 'Філіал', 'Найнятий', 'Звільнений']

    const rows = employeeList.map(employee => {
        const hiredFromDate = new Date(employee.hiredFrom)
        const hiredFrom = dateFormatInstance.format(hiredFromDate)

        let firedFrom = '-'
        if (employee.firedFrom) {
            const firedFromDate = new Date(employee.firedFrom)
            firedFrom = dateFormatInstance.format(firedFromDate)
        }

        return {
            id: employee.id,
            fullName: `${employee.firstName} ${employee.lastName}`,
            phoneNumber: employee.phoneNumber,
            rank: employee.rank.rank,
            branch: `${employee.branch.city}, ${employee.branch.address}`,
            hiredFrom,
            firedFrom: firedFrom
        }
    })

    return (
        <AdminMainContent
            headerTitles={headerTitles}
            rows={rows}
            rowsCount={itemCount}
            pageSize={pageSize}
        />
    )
}

export default AdminEmployee