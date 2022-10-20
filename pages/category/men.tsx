import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { useProducts } from '../../hooks'
import { FullScreenLoading } from '../../components/ui'

const MenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=men');

    return (
        <ShopLayout title='Teslo-Shop - Women' pageDescription='Find the best teslo products for men here'>
            <Typography variant='h1' component='h1'>Store</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>Products for men</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default MenPage
