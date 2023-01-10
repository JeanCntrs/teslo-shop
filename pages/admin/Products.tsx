import { CategoryOutlined } from '@mui/icons-material';
import { CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { NextPage } from "next";
import useSWR from 'swr';
import { AdminLayout } from "../../components/layouts";
import { IProduct } from '../../interfaces';
import NextLink from 'next/link';

const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Photo',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
                    <CardMedia
                        component='img'
                        alt={row.title}
                        className='fadeIn'
                        image={`/products/${row.img}`}
                    />
                </a>
            )
        }
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 300,
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline='always'>
                        {row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Gender' },
    { field: 'type', headerName: 'Type' },
    { field: 'inStock', headerName: 'Stock' },
    { field: 'price', headerName: 'Price' },
    { field: 'sizes', headerName: 'Sizes', width: 250 }
];

const ProductsPage: NextPage = () => {
    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    if (!data && !error) return <></>;

    const rows = data!.map(product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug
    }));

    return (
        <AdminLayout
            title={`Products (${data?.length})`}
            subTitle='Products maintainer'
            icon={<CategoryOutlined />}
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

export default ProductsPage;