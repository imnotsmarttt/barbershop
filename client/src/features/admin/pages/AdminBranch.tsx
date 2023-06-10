import AdminMainContent from "../components/MainContent/AdminMainContent";
import {useAppDispatch} from "hooks/store";
import {useEffect} from "react";
import {fetchBranchList} from "store/slices/admin";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";

function AdminBranch() {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchBranchList({query: searchParams.toString()}))
    }, [dispatch, searchParams])

    const {branchList, pageSize, itemCount} = useSelector((state: RootStateType) => state.admin.branch)

    const headerTitles = ['ID', 'Назва', 'Місто', 'Адреса', 'Відкивається', 'Закривається']

    return (
        <AdminMainContent
            headerTitles={headerTitles}
            rows={branchList}
            rowsCount={itemCount}
            pageSize={pageSize}
        />
    )
}

export default AdminBranch