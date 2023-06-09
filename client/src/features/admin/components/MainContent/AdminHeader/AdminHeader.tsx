import {Grid} from "@mui/material";
import s from './AdminHeader.module.css'

function AdminHeader() {
    return (
        <Grid container item xs={12} sx={{height: 'fit-content'}} className={s.header}>
            <Grid container item xs={2} sx={{marginLeft: 'auto'}} className={s.header_user}>
                <Grid item className={s.header_user_photo}>

                </Grid>
                <Grid item className={s.header_user_info}>
                    <h6 className={s.header_user_info__full_name}>Ім'я</h6>
                    <p className={s.header_user_info__role}>Роль</p>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminHeader