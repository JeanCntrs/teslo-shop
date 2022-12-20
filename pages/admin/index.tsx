import { DashboardOutlined } from "@mui/icons-material";
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
            <h3>Hi</h3>
        </AdminLayout>
    );
}

export default DashboardPage;