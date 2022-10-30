import NextLink from 'next/link';
import { Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { Box } from '@mui/system';
import { ItemCounter } from '../ui';
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';

interface CartListProps {
    editable?: boolean;
}

export const CartList: React.FC<CartListProps> = ({ editable = false }) => {
    const { cart } = useContext(CartContext);

    return (
        <>
            {
                cart.map(product => (
                    <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink href='/product/slug' passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla: <strong>M</strong></Typography>

                                {
                                    editable
                                        ?
                                        <ItemCounter
                                            currentValue={product.quantity}
                                            maxValue={10}
                                            handleUpdateQuantity={() => { }} />
                                        :
                                        <Typography variant='h5'>{product.quantity}{product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>${product.price}</Typography>

                            {
                                editable &&
                                <Button variant='text' color='secondary'>
                                    Remove
                                </Button>
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    );
}