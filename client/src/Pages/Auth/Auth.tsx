import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../../store/store";


export function Auth() {

    const {isAuth} = useSelector((state: RootStateType) => state.auth)
    if (isAuth) {
        return <Navigate to='/'/>
    }
    return <Outlet/>
}

export default Auth