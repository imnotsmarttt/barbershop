import AdminMainContent from "../components/MainContent/AdminMainContent";
import {useAppDispatch} from "hooks/store";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {fetchEmployeeList} from "store/slices/admin-employee";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";
import {dateFormatInstance} from "lib/intl";
import DeleteModal from "components/Modal/DeleteModal";
import {toggleEmployeeDeleteModal, deleteEmployee} from "store/slices/admin-employee";


interface RowType {
    id: number;
    [key: string]: string | number
}

function AdminEmployee() {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchEmployeeList({query: searchParams.toString()}))
    }, [dispatch, searchParams])

    const {employeeList, itemCount, pageSize} = useSelector((state: RootStateType) => state.admin.employee)

    const headerTitles = ['ID', 'ПІБ', 'Номер телефону', 'Посада', 'Філіал', 'Найнятий', 'Звільнений', '']

    // generate rows for table body
    const rows: RowType[] = employeeList.map(employee => {
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

    // modal
    const {isActive, id} = useSelector((state: RootStateType) => state.admin.employee.deleteModal)

    return (
        <>
            <DeleteModal
                id={id}
                isActive={isActive}
                toggleModal={toggleEmployeeDeleteModal}
                deleteFunction={deleteEmployee}
            />
            <AdminMainContent
                headerTitles={headerTitles}
                rows={rows}
                rowsCount={itemCount}
                pageSize={pageSize}

                tableTitle='Працівники'
                toggleDeleteModal={toggleEmployeeDeleteModal}
            />
        </>
    )
}

export default AdminEmployee