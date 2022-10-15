import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from "@mui/material";
import { NextPage } from "next";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";


const SummaryPage: NextPage = () => {
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
                            <Typography>Summary (3 products)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography variant='subtitle1'>Delivery address</Typography>
                            <Typography>info line</Typography>
                            <Typography>info line</Typography>
                            <Typography>info line</Typography>
                            <Typography>info line</Typography>
                            <Typography>info line</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirm order
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage;