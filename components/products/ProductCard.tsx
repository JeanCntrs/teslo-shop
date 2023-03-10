import { useMemo, useState } from "react";
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from "@mui/material";
import { IProduct } from "../../interfaces";

interface ProductCardProps {
    product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`
    }, [isHovered, product.images]);

    return (
        <Grid
            item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            {
                                product.inStock === 0 &&
                                <Chip
                                    color='primary'
                                    label='Not available'
                                    sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                                />
                            }
                            <CardMedia
                                component='img'
                                className='fadeIn'
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>

            {
                isImageLoaded &&
                <Box sx={{ mt: 1 }} className='fadein'>
                    <Typography fontWeight={700}>{product.title}</Typography>
                    <Typography fontWeight={500}>${product.price}</Typography>
                </Box>
            }

        </Grid>
    );
}