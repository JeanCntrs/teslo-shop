import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from "@mui/material";
import { NextPage } from "next";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context';
import { countries } from '../../utils';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const SummaryPage: NextPage = () => {
    const router = useRouter();
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address');
        }
    }, [router])

    const handleCreateOrder = async () => {
        setIsPosting(true);

        const { hasError, message } = await createOrder();

        if (hasError) {
            setIsPosting(false);
            setErrorMessage(message);

            return;
        }

        router.replace(`/orders/${message}`);
    }

    if (!shippingAddress) {
        return <></>;
    }

    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;

    return (
        <ShopLayout title='Order summary' pageDescription='Order summary'>
            <Typography variant='h1' component='h1'>Order summary</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography>Summary ({numberOfItems} {numberOfItems === 1 ? 'Product' : 'Products'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography variant='subtitle1'>Delivery address</Typography>
                            <Typography>{firstName} {lastName}</Typography>
                            <Typography>{address}{address2 && `, ${address2}`}</Typography>
                            <Typography>{city} {zip}</Typography>
                            {/* <Typography>{countries.find(c => c.code === country)?.name}</Typography> */}
                            <Typography>{country}</Typography>
                            <Typography>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                <Button
                                    color='secondary'
                                    className='circular-btn'
                                    fullWidth
                                    onClick={handleCreateOrder}
                                    disabled={isPosting}
                                >
                                    Confirm order
                                </Button>

                                <Chip
                                    color='error'
                                    label={errorMessage}
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage;