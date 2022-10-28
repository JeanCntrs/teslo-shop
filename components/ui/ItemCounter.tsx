import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface ItemCounterProps {
    currentValue: number;
    maxValue: number;

    // Methods
    handleUpdateQuantity: (quantity: number) => void;
}

export const ItemCounter: React.FC<ItemCounterProps> = ({ currentValue, maxValue, handleUpdateQuantity }) => {
    const handleAddOrRemove = (value: number) => {
        if (value === -1) {
            if (currentValue === 1) return;

            return handleUpdateQuantity(currentValue - 1);
        }

        if (currentValue >= maxValue) return;

        return handleUpdateQuantity(currentValue + 1);
    }

    return (
        <Box display='flex' alignItems='center'>
            <IconButton onClick={() => handleAddOrRemove(-1)}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
            <IconButton onClick={() => handleAddOrRemove(+1)}>
                <AddCircleOutline />
            </IconButton>
        </Box>
    );
}