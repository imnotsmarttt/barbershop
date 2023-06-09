import {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {Alert, Button, Grid, TextField} from "@mui/material";
import Loader from "components/Loader/Loader";

import s from './Auth.module.css'

import {login, setError} from "store/slices/auth";
import {useAppDispatch} from "hooks/store";
import {useSelector} from "react-redux";
import {RootStateType} from "types/store/store";
import {SubmitHandler, useForm} from "react-hook-form";


type Inputs = {
    username: string;
    password: string
}

function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({mode: "onChange"})
    const {error, fetching} = useSelector((state: RootStateType) => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setError(''))
    }, [dispatch])

    const handleLogin: SubmitHandler<Inputs> = (data) => {
        dispatch(login({
            username: data.username,
            password: data.password
        }))
    }

    if (fetching === 'pending') {
        return <Loader/>
    }

    return (
        <Grid container className='container'>
            <Grid item container className={s.wrapper}>
                <form onSubmit={handleSubmit(handleLogin)} className={s.form}>
                    <h1 className={s.form__item}>Вхід</h1>
                    {error && <Alert
                        severity="error"
                        className={s.form__item}
                    >{error}</Alert>}

                    <div className={s.form__item}>
                        <TextField
                            id="username"
                            label="Ім'я користувача"
                            variant="standard"
                            className={s.form__input}
                            {...register('username', {
                                required: `Обов'язкове поле`
                            })}
                        />
                        {errors?.username && <p className='error_text'>{errors.username.message}</p>}
                    </div>

                    <div className={s.form__item}>
                        <TextField
                            id="password"
                            label="Пароль"
                            variant="standard"
                            type='password'
                            className={s.form__input}
                            {...register('password', {
                                required: `Обов'язкове поле`,
                            })}
                        />
                        {errors?.password && <p className='error_text'>{errors.password.message}</p>}
                    </div>

                    <p className={`${s.form__item} text`}>
                        Не зареєстровані? <NavLink to='/a/register'>Зареєструватися</NavLink>
                    </p>
                    <Button variant="outlined" type='submit' className={s.form__item}>Увійти</Button>

                </form>
            </Grid>
        </Grid>
    )
}

export default LoginForm