import {Grid} from "@mui/material";
import s from '../Admin.module.css'

function AdminHeader() {
    return (
        <Grid container item xs={12} sx={{height: 'fit-content'}} className={s.header__wrapper}>
            <Grid container item xs={2} sx={{marginLeft: 'auto'}} className={s.header__user}>
                <Grid item className={s.photo__container}>

                </Grid>
                <Grid item className={s.info__container}>
                    <h6 className={s.full_name}>Ім'я</h6>
                    <p className={s.role}>Роль</p>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminHeader