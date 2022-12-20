import { NextPage, GetServerSideProps } from "next";
import NextLink from "next/link";
import { Typography, Grid, Card, CardContent, Divider, Box, Link, Chip, CircularProgress } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from '../../interfaces/order';
import { PayPalButtons } from '@paypal/react-paypal-js';
import tesloApi from '../../api/teslo-api';
import { useRouter } from "next/router";
import { useState } from 'react';

export type OrderResponseBody = {
    id: string;
    status: "COMPLETED" | "SAVED" | "APPROVED" | "VOIDED" | "PAYER_ACTION_REQUIRED";
}

interface OrderPageProps {
    order: IOrder;
}

const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
    const router = useRouter();
    const { shippingAddress } = order;
    const [isPaying, setIsPaying] = useState(false);

    const handleOrderCompleted = async (details: OrderResponseBody) => {
        if (details.status !== 'COMPLETED') {
            return alert('Order not completed');
        }

        setIsPaying(true);

        try {
            const { data } = await tesloApi.post('/orders/pay', {
                transactionId: details.id,
                order: order._id
            });

            router.reload();
        } catch (error) {
            setIsPaying(false);
            console.log('error in handleOrderCompleted', error)
            alert('Error');
        }
    }

    return (
        <ShopLayout title='Order summary' pageDescription='Order summary'>
            <Typography variant='h1' component='h1'>Order: {order._id}</Typography>
            {
                order.isPaid
                    ? <Chip
                        sx={{ my: 2 }}
                        label='Paid order'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                    />
                    : <Chip
                        sx={{ my: 2 }}
                        label='Pending payment'
                        variant='outlined'
                        color='error'
                        icon={<CreditCardOffOutlined />}
                    />
            }

            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography>Summary ({order.numberOfItems} {order.numberOfItems > 1 ? 'products' : 'product'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Typography variant='subtitle1'>Delivery address</Typography>
                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                            <Typography>{shippingAddress.city} {shippingAddress.zip}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrderSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    total: order.total,
                                    tax: order.tax
                                }}
                            />

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                <Box
                                    display={'flex'}
                                    justifyContent='center'
                                    className='fadeIn'
                                    sx={{ display: isPaying ? 'flex' : 'none' }}
                                >
                                    <CircularProgress />
                                </Box>
                                <Box flexDirection='column' sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}>
                                    {
                                        order.isPaid
                                            ? <Chip
                                                sx={{ my: 2 }}
                                                label='Paid order'
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditScoreOutlined />}
                                            />
                                            :
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: `${order.total}`,
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order!.capture().then((details) => {
                                                        console.log('details', details);
                                                        handleOrderCompleted(details);
                                                    });
                                                }}
                                            />
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const session: any = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: `/auth/sign-in?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;