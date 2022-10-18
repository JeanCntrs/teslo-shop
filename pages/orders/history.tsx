import { NextPage } from "next";
import NextLink from 'next/link';
import { Chip, Grid, Typography, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ShopLayout } from "../../components/layouts";

const HistoryPage: NextPage = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'fullname', headerName: 'Fullname', width: 300 },
        {
            field: 'paid',
            headerName: 'Payd',
            description: 'Shows order payment information',
            width: 200,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    params.row.paid
                        ? <Chip color='success' label='Paid out' variant='outlined' />
                        : <Chip color='error' label='Not payed' variant='outlined' />
                );
            },
        },
        {
            field: 'order',
            headerName: 'Order',
            width: 200,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <NextLink href={`/orders/${params.row.id}`} passHref>
                        <Link underline='always'>
                            See order
                        </Link>
                    </NextLink>
                );
            },
        }
    ];

    const rows = [
        { id: 1, fullname: 'fulname_1', paid: true },
        { id: 2, fullname: 'fulname_2', paid: false },
        { id: 3, fullname: 'fulname_3', paid: true },
        { id: 4, fullname: 'fulname_4', paid: false },
        { id: 5, fullname: 'fulname_5', paid: true },
        { id: 6, fullname: 'fulname_6', paid: true },
    ];

    return (
        <ShopLayout title='Order history' pageDescription='Customer order history'>
            <Typography variant='h1' component='h1'>Order history</Typography>

            <Grid container>
                <Grid item sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    );
}

export default HistoryPage;