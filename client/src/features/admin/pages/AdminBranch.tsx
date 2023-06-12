import AdminMainContent from "../components/MainContent/AdminMainContent";
import {useAppDispatch} from "hooks/store";
import {useEffect} from "react";
import {fetchBranchList, toggleBranchDeleteModal, deleteBranch} from "store/slices/admin-branch";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";
import DeleteModal from "components/Modal/DeleteModal";

function AdminBranch() {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchBranchList({query: searchParams.toString()}))
    }, [dispatch, searchParams])

    const {branchList, pageSize, itemCount} = useSelector((state: RootStateType) => state.admin.branch)

    const headerTitles = ['ID', 'Назва', 'Місто', 'Адреса', 'Відкивається', 'Закривається', '']

    const rows = branchList.map(branch => ({...branch}))

    const {isActive, id} = useSelector((state: RootStateType) => state.admin.branch.deleteModal)

    return (
        <>
            <DeleteModal isActive={isActive} id={id} toggleModal={toggleBranchDeleteModal} deleteFunction={deleteBranch}/>
            <AdminMainContent
                headerTitles={headerTitles}
                rows={rows}
                rowsCount={itemCount}
                pageSize={pageSize}
                toggleDeleteModal={toggleBranchDeleteModal}

                tableTitle='Філіали'
            />
        </>
    )
}

export default AdminBranch