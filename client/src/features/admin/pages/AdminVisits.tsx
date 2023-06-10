import AdminMainContent from "features/admin/components/MainContent/AdminMainContent";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";
import {useEffect} from "react";
import {useAppDispatch} from "hooks/store";
import {fetchVisitList} from "store/slices/admin";
import {useSearchParams} from "react-router-dom";
import {dateTimeFormatInstance} from "lib/intl";

function AdminVisits() {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchVisitList({query: searchParams.toString()}))
    }, [searchParams, dispatch])

    const {visitList, pageSize, visitCount} = useSelector((state: RootStateType) => state.admin.visits)

    // titles for table header
    const headerTitles = ['ID', 'ПІБ', 'Телефон', 'Початок', 'Працівник', 'Послуга', 'Ціна', 'Статус']

    // generate rows for table
    const rows = visitList.map(visit => {
        const {id, fullName, phoneNumber, startDate, status} = visit
        const date = new Date(startDate)

        return {
            id, fullName, phoneNumber,
            startDate: dateTimeFormatInstance.format(date),
            employee: `${visit.employee.firstName} ${visit.employee.lastName}`,
            service: visit.service.service,
            price: `${visit.service.price}₴`,
            status: status === 'NOT_STARTED' && 'Очікування'
        }
    })

    return (
        <AdminMainContent
            headerTitles={headerTitles}
            rows={rows}
            rowsCount={visitCount}
            pageSize={pageSize}
        />
    )
}

export default AdminVisits
