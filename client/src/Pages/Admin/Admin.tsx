import AdminNav from "../../Components/AdminComponents/Nav/AdminNav";
import {Grid} from "@mui/material";
import AdminMainContent from "../../Components/AdminComponents/AdminMainContent";

function Admin() {
    return (
        <Grid container className='container'>
            <AdminNav />

            <AdminMainContent />
        </Grid>
        )

}

export default Admin