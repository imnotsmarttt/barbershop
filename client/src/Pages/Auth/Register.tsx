import {FormEvent, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

import s from './Auth.module.css'

import {registerThunk, setError} from "../../store/slices/auth";
import {useAppDispatch} from "../../hook";
import {useSelector} from "react-redux";
import {RootStateType} from "../../store/store";

import {Alert, Button, Grid, TextField} from "@mui/material";
import Loader from "../../Components/Loader/Loader";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    username: string;
    password: string;
    password2: string;
}

function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({mode: "onChange"})
    const {error, fetching} = useSelector((state: RootStateType) => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(setError(''))
    }, [])





    const handleRegister: SubmitHandler<Inputs> = (data) => {
        dispatch(registerThunk({
            username: data.username,
            password: data.password,
            password2: data.password2
        }))
    }

    return fetching === 'pending' ? <Loader/> : <Grid container className='container'>
        <Grid item container className={s.wrapper}>
            <form onSubmit={handleSubmit(handleRegister)} className={s.form}>
                <h1 className={s.form__item}>Реєстрація</h1>
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
                            minLength: {
                                value: 7,
                                message: 'Мінімальна довжина пароля 7 символів'
                            }
                        })}
                    />
                    {errors?.password && <p className='error_text'>{errors.password.message}</p>}
                </div>

                <div className={s.form__item}>
                    <TextField
                        id="password2"
                        label="Повторіть пароль"
                        variant="standard"
                        type='password'
                        className={s.form__input}
                        {...register('password2', {
                            required: `Обов'язкове поле`,
                            minLength: {
                                value: 7,
                                message: 'Мінімальна довжина пароля 7 символів'
                            }
                        })}
                    />
                    {errors?.password2 && <p className='error_text'>{errors.password2.message}</p>}
                </div>


                <p className={`${s.form__item} text`}>
                    Зареєстровані? <NavLink to='/a/login'>Вхід</NavLink>
                </p>
                <Button variant="outlined" type='submit' className={s.form__item}>Зареєструватися</Button>

            </form>
        </Grid>
    </Grid>
}

export default Register