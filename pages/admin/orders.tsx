import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Grid } from "@mui/material";
import { NextPage } from "next";
import { AdminLayout } from "../../components/layouts";

const OrdersPage: NextPage = () => {
    return (
        <AdminLayout
            title='Orders'
            subTitle='Orders maintainer'
            icon={<ConfirmationNumberOutlined />}
        >
            <Grid container className='fadeIn'>
                <Grid item sx={{ height: 650, width: '100%' }}>

                </Grid>
            </Grid>
        </AdminLayout>
    );
}

export default OrdersPage;