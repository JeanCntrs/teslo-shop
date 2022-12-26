import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { SummaryTile } from "../../components/admin";
import { AdminLayout } from "../../components/layouts";
import useSWR from 'swr';
import { DashboardSummaryResponse } from '../../interfaces/dashboard';
import { useState, useEffect } from 'react';

interface DashboardPageProps {

}

const DashboardPage: React.FC<DashboardPageProps> = () => {
    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 seconds
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    if (!error && !data) {
        return <></>
    }

    if (error) {
        console.log('error', error)
        return <Typography>Error loading information</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;

    return (
        <AdminLayout
            title='Dashboard'
            subTitle='General statistics'
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>
                <SummaryTile
                    title={numberOfOrders}
                    subtitle='Total orders'
                    icon={<CreditCardOffOutlined color='secondary' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={paidOrders}
                    subtitle='Paid orders'
                    icon={<AttachMoneyOutlined color='success' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={notPaidOrders}
                    subtitle='Pending orders'
                    icon={<CreditCardOffOutlined color='error' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfClients}
                    subtitle='Clients'
                    icon={<GroupOutlined color='primary' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfProducts}
                    subtitle='Products'
                    icon={<CategoryOutlined color='warning' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={productsWithNoInventory}
                    subtitle='Out of Stock'
                    icon={<CancelPresentationOutlined color='error' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={lowInventory}
                    subtitle='Low inventory'
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={refreshIn}
                    subtitle='Update in:'
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontsize: 40 }} />}
                />
            </Grid>
        </AdminLayout>
    );
}

export default DashboardPage;