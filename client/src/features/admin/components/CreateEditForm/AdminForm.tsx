import {Alert, Button, Grid, TextField} from "@mui/material";
import s from "../../../auth/components/Auth.module.css";
import Input from "components/Form/Input/Input";
import {NavLink} from "react-router-dom";
import {UseControllerProps, useForm} from "react-hook-form";
import {AdminEmployeeCreatePayloadType} from "../../../../types/store/admin-employee";
import {UseFormHandleSubmit} from "react-hook-form/dist/types/form";
import DefaultDatePicker from "components/Form/DatePicker/DatePicker";
import {Inputs} from "../../pages/AdminEmployeeForm";
import DefaultInput from "../../../../components/Form/Input/DefaultInput";
import DefaultSelect from "../../../../components/Form/Select/DefaultSelect";


type InputType = {
    input: {
        type: string;
        label: string;
        options?: {name: string, value: string}[]
    },
    controller: UseControllerProps<any>,
}

type PropsType = {
    formTitle: string;
    buttonText: string;

    error: string | undefined;
    inputs: InputType[]

    handleForm: any
    handleSubmit: any
}

function AdminForm(props: PropsType) {
    const {error, inputs, formTitle, buttonText, handleForm, handleSubmit} = props


    const formInputs = inputs.map((input: InputType) => {
        if (input.input.type === 'select' && input.input.options) {
            return <DefaultSelect label={input.input.label} controller={input.controller}
                                  options={input.input.options}/>
        }
        // if (input.type === 'date') {
        //     return <DefaultDatePicker controller={input.controller} />
        // }
        if (input.input.type === 'text') {
            return <DefaultInput controller={input.controller} label={input.input.label}/>
        }
    })

    return (
        <Grid container className='container'>
            <Grid item container className={s.auth}>
                <form onSubmit={handleSubmit(handleForm)} className={s.auth_form}>
                    <h1 className='form_item'>{formTitle}</h1>
                    {error && <Alert severity="error" className={s.form__item}>{error}</Alert>}
                    {formInputs}
                    <Button variant="outlined" type='submit' className='form_item'>{buttonText}</Button>
                </form>
            </Grid>
        </Grid>
    )
}

export default AdminForm