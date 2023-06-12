import AdminMainContent from "../components/MainContent/AdminMainContent";
import {useAppDispatch} from "hooks/store";
import {useEffect} from "react";
import {fetchServiceList, toggleServicesDeleteModal, deleteService} from "store/slices/admin-services";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";
import DeleteModal from "../../../components/Modal/DeleteModal";

function AdminServices() {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchServiceList({query: searchParams.toString()}))
    }, [dispatch, searchParams])
    const {serviceList, pageSize, itemCount} = useSelector((store: RootStateType) => store.admin.services)

    const headerTitles = ['ID', 'Послуга', 'Ціна', 'Тривалість', 'Посада', '']

    const rows = serviceList.map((service) => {
        const {photoUrl, ...cleanService} = service
        return {
            ...cleanService,
            rank: service.rank.rank
        }
    })

    const {isActive, id} = useSelector((state: RootStateType) => state.admin.services.deleteModal)

    return (
        <>
            <DeleteModal
                isActive={isActive}
                toggleModal={toggleServicesDeleteModal}
                deleteFunction={deleteService}
                id={id}
            />
            <AdminMainContent
                tableTitle='Послуги'

                headerTitles={headerTitles}
                rows={rows}
                rowsCount={itemCount}
                pageSize={pageSize}
                toggleDeleteModal={toggleServicesDeleteModal}
            />
        </>
    )
}

export default AdminServices
