import AdminForm from "../components/CreateEditForm/AdminForm";
import {SubmitHandler, useController, useForm} from "react-hook-form";
import {AdminEmployeeCreatePayloadType} from "types/store/admin-employee";
import {createEmployee} from "store/slices/admin-employee";
import {useAppDispatch} from "hooks/store";
import {useEffect, useState} from "react";
import {BranchInterface} from "../../../types/general/branch";
import {axiosInstance} from "../../../lib/axios";

export interface Inputs extends AdminEmployeeCreatePayloadType {
}

function AdminEmployeeForm() {
    const dispatch = useAppDispatch()
    const {control, handleSubmit, formState: {errors}} = useForm<Inputs>({
        mode: "onChange",
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            hiredFrom: '',
            branchId: '',
            rankId: '',
            userId: '',
        }
    })
    const [branchOptions, setBranchOptions] = useState<BranchInterface[]>([])

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        axiosInstance.get('admin/branch', config).then(response => {
            setBranchOptions(response.data.branchList)
        })
        console.log(branchOptions)
    }, [])

    const branch = branchOptions.map(branch => ({value: `branch.id`, name: `${branch.name}. ${branch.city}, ${branch.address}`}))

    const inputs = [
        {
            input: {type: 'text', label: `Ім'я`},
            controller: {control, name: 'firstName', rules: {required: `Це поле є обов'язковим`}}
        },
        {
            input: {type: 'text', label: `Фамілія`},
            controller: {control, name: 'lastName', rules: {required: `Це поле є обов'язковим`}}
        },
        {
            input: {type: 'text', label: `Email`},
            controller: {control, name: 'email', rules: {required: `Це поле є обов'язковим`}}
        },
        {
            input: {type: 'phoneNumber', label: `Фамілія`},
            controller: {control, name: 'phoneNumber', rules: {required: `Це поле є обов'язковим`}}
        },
        {
            input: {type: 'select', label: `Філіал`, options: branch},
            controller: {control, name: 'hiredFrom', rules: {required: `Це поле є обов'язковим`}}
        },
        {
            input: {type: 'date', label: `Найнятий з`, },
            controller: {control, name: 'hiredFrom', rules: {required: `Це поле є обов'язковим`}}
        },
    ]

    const handleCreateEmployee: SubmitHandler<Inputs> = (data, event) => {
        event?.preventDefault()
        dispatch(createEmployee({...data}))
    }

    return <AdminForm error='' inputs={inputs} formTitle='Додати працівника' buttonText='Додати'
                      handleForm={handleCreateEmployee} handleSubmit={handleSubmit}/>
}

export default AdminEmployeeForm