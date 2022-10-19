import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { initialData } from '../database/products'
import { useProducts } from '../hooks'



const HomePage: NextPage = () => {


    const { products, isLoading } = useProducts('/products');

    return (
        <ShopLayout title='Teslo-Shop - Home' pageDescription='Find the best teslo products here'>
            <Typography variant='h1' component='h1'>Store</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>All the products</Typography>

            {
                isLoading
                    ? <h1>Loading...</h1>
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default HomePage
