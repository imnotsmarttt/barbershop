import AdminMainContent from "../../Components/AdminComponents/AdminMainContent";
import {useSelector} from "react-redux";
import {RootStateType} from "../../store/store";
import {useEffect} from "react";
import {useAppDispatch} from "../../hook";
import {fetchVisitList} from "../../store/slices/admin";
import {dateFormatting} from "../../services/admin";
import {useSearchParams} from "react-router-dom";

function AdminVisits() {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchVisitList({query: searchParams.toString()}))
    }, [searchParams, dispatch])

    const {visitList, pageSize, visitCount} = useSelector((state: RootStateType) => state.admin.visits)

    // titles for table header
    const headerTitles =  ['ID', 'ПІБ', 'Телефон', 'Початок', 'Працівник', 'Послуга', 'Ціна', 'Статус']

    // generate rows for table
    const rows = visitList.map(visit => {
        const {id, fullName, phoneNumber, startDate, status} = visit
        const start = dateFormatting(startDate)
        return {
            id, fullName, phoneNumber,
            startDate: `${start.date}, ${start.time}`,
            employee: `${visit.employee.firstName} ${visit.employee.lastName}`,
            service: visit.service.service,
            price: `${visit.service.price}₴`,
            status: status === 'NOT_STARTED' && 'Очікування'
        }
    })

    return (
        <AdminMainContent headerTitles={headerTitles} rows={rows} rowsCount={visitCount} pageSize={pageSize} />
    )
}

export default AdminVisits
