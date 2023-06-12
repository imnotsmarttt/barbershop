import AdminMainContent from "features/admin/components/MainContent/AdminMainContent";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";
import {useEffect} from "react";
import {useAppDispatch} from "hooks/store";
import {fetchVisitList, toggleVisitsDeleteModal, deleteVisit} from "store/slices/admin-visits";
import {useSearchParams} from "react-router-dom";
import {dateTimeFormatInstance} from "lib/intl";
import DeleteModal from "../../../components/Modal/DeleteModal";

function AdminVisits() {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchVisitList({query: searchParams.toString()}))
    }, [searchParams, dispatch])

    const {visitList, pageSize, visitCount} = useSelector((state: RootStateType) => state.admin.visits)

    const headerTitles = ['ID', 'ПІБ', 'Телефон', 'Початок', 'Працівник', 'Послуга', 'Ціна', 'Статус', '']

    const rows = visitList.map(visit => {
        const {id, fullName, phoneNumber, startDate, status} = visit
        const date = new Date(startDate)

        return {
            id, fullName, phoneNumber,
            startDate: dateTimeFormatInstance.format(date),
            employee: visit.employee ? `${visit.employee.firstName} ${visit.employee.lastName}` : '-',
            service: visit.service.service,
            price: `${visit.service.price}₴`,
            status: status
        }
    })

    const {isActive, id} = useSelector((state: RootStateType) => state.admin.visits.deleteModal)

    return (
        <>
            <DeleteModal
                isActive={isActive}
                toggleModal={toggleVisitsDeleteModal}
                deleteFunction={deleteVisit}
                id={id}
            />
            <AdminMainContent
                tableTitle='Записи'

                headerTitles={headerTitles}
                rows={rows}
                rowsCount={visitCount}
                pageSize={pageSize}
                toggleDeleteModal={toggleVisitsDeleteModal}
            />
        </>
    )
}

export default AdminVisits
