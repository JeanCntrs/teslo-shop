import { NextPage, GetServerSideProps } from "next";
import { Typography, Grid, Card, CardContent, Divider, Box, Chip } from "@mui/material";
import { CartList, OrderSummary } from "../../../components/cart";
import { AdminLayout } from "../../../components/layouts";
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { dbOrders } from "../../../database";
import { IOrder } from '../../../interfaces/order';

interface OrderPageProps {
    order: IOrder;
}

const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
    const { shippingAddress } = order;

    return (
        <AdminLayout
            title='Order summary'
            subTitle={`OrderId: ${order._id}`}
            icon={<AirplaneTicketOutlined />
            }>
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
                                <Box flexDirection='column' display='flex'>
                                    {
                                        order.isPaid
                                            ? <Chip
                                                sx={{ my: 2, flex: 1 }}
                                                label='Paid order'
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditScoreOutlined />}
                                            />
                                            :
                                            <Chip
                                                sx={{ my: 2, flex: 1 }}
                                                label='Pending payment'
                                                variant='outlined'
                                                color='error'
                                                icon={<CreditCardOffOutlined />}
                                            />
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/admin/orders',
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