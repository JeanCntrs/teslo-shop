import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { SummaryTile } from "../../components/admin";
import { AdminLayout } from "../../components/layouts";

interface DashboardPageProps {

}

const DashboardPage: React.FC<DashboardPageProps> = () => {
    return (
        <AdminLayout
            title='Dashboard'
            subTitle='general statistics'
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>
                <SummaryTile
                    title={1}
                    subtitle='Total orders'
                    icon={<CreditCardOffOutlined color='secondary' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={2}
                    subtitle='Paid orders'
                    icon={<AttachMoneyOutlined color='success' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={3}
                    subtitle='Pending orders'
                    icon={<CreditCardOffOutlined color='error' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={4}
                    subtitle='Clients'
                    icon={<GroupOutlined color='primary' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={5}
                    subtitle='Products'
                    icon={<CategoryOutlined color='warning' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={6}
                    subtitle='Out of Stock'
                    icon={<CancelPresentationOutlined color='error' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={7}
                    subtitle='Low inventory'
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontsize: 40 }} />}
                />
                <SummaryTile
                    title={8}
                    subtitle='Update in:'
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontsize: 40 }} />}
                />
            </Grid>
        </AdminLayout>
    );
}

export default DashboardPage;