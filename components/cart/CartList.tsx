import { Typography } from '@mui/material';
import { initialData } from '../../database/products';

interface CartListProps {

}

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
];

export const CartList: React.FC<CartListProps> = () => {
    return (
        <>
            {
                productsInCart.map(product => (
                    <Typography key={product.slug}>{product.title}</Typography>
                ))
            }
        </>
    );
}