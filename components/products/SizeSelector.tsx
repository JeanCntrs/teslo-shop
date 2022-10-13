import { Box, Button } from '@mui/material';
import { ISize } from '../../interfaces/products';

interface SizeSelectorProps {
    selectedSize?: ISize;
    sizes: ISize[];
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, sizes }) => {
    return (
        <Box>
            {
                sizes.map(size => (
                    <Button
                        key={size}
                        size='small'
                        color={selectedSize === size ? 'primary' : 'info'}
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    );
}