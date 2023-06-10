import AdminMainContent from "../components/MainContent/AdminMainContent";
import {useAppDispatch} from "hooks/store";
import {useEffect} from "react";
import {fetchServiceList} from "store/slices/admin";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";

function AdminServices() {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchServiceList({query: searchParams.toString()}))
    }, [dispatch, searchParams])
    const {serviceList, pageSize, itemCount} = useSelector((store: RootStateType) => store.admin.services)

    const headerTitles = ['ID', 'Послуга', 'Ціна', 'Тривалість', 'Посада']

    const rows = serviceList.map((service) => {
        const {photoUrl, ...cleanService} = service
        return {
            ...cleanService,
            rank: service.rank.rank
        }
    })

    return <AdminMainContent
        headerTitles={headerTitles}
        rows={rows}
        rowsCount={itemCount}
        pageSize={pageSize}
    />
}

export default AdminServices
