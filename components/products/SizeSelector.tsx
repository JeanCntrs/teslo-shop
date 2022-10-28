import { Box, Button } from '@mui/material';
import { ISize } from '../../interfaces/products';

interface SizeSelectorProps {
    selectedSize?: ISize;
    sizes: ISize[];

    // Method
    handleSelectedSize: (size: ISize) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, sizes, handleSelectedSize }) => {
    return (
        <Box>
            {
                sizes.map(size => (
                    <Button
                        key={size}
                        size='small'
                        color={selectedSize === size ? 'primary' : 'info'}
                        onClick={() => handleSelectedSize(size)}
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    );
}