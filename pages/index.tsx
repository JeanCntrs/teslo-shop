import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'


const Home: NextPage = () => {
    return (
        <ShopLayout title='Teslo-Shop - Home' pageDescription='Find the best teslo products here'>
            <Typography variant='h1' component='h1'>Store</Typography>
            <Typography variant='h2' sx={{mb:1}}>All the products</Typography>
        </ShopLayout>
    )
}

export default Home
