import {useSelector} from "react-redux";
import {RootStateType} from "../store/store";
import {Navigate} from 'react-router-dom'
import {useAppDispatch} from "../hook";
import {useEffect} from "react";
import {checkAuth} from "../store/slices/auth";

type PropsType = {
    children: JSX.Element
}

function AuthComponent({children}: PropsType) {
    const {isAuth} = useSelector((state: RootStateType) => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [])


    if (!isAuth) {
        return <Navigate to='/a/login'/>
    }
    return children
}

export default AuthComponent