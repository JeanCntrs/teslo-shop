import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { NextPage } from "next";
import useSWR from 'swr';
import { AdminLayout } from "../../components/layouts";
import { IOrder, IUser } from '../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Fullname', width: 300 },
    { field: 'total', headerName: 'Total', width: 300 },
    {
        field: 'isPaid',
        headerName: 'Paid',
        renderCell: ({ row }: GridRenderCellParams) => {
            return row.isPaid
                ? <Chip variant='outlined' label='Paid' color='success'></Chip>
                : <Chip variant='outlined' label='Pending' color='error'></Chip>
        }
    },
    { field: 'noProducts', headerName: 'Nº Products', align: 'center', width: 150 },
    {
        field: 'check',
        headerName: 'See order',
        renderCell: ({ row }: GridRenderCellParams) => {
            return <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
                See order
            </a>
        }
    },
    { field: 'createdAt', headerName: 'Created at', width: 250 }
];

const OrdersPage: NextPage = () => {
    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if (!data && !error) return <></>;

    const rows = data!.map(order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: order.createdAt
    }));

    return (
        <AdminLayout
            title='Orders'
            subTitle='Orders maintainer'
            icon={<ConfirmationNumberOutlined />}
        >
            <Grid container className='fadeIn'>
                <Grid item sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </AdminLayout>
    );
}

export default OrdersPage;