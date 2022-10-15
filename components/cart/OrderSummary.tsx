import { Grid, Typography } from "@mui/material";

interface OrderSummaryProps {

}

export const OrderSummary: React.FC<OrderSummaryProps> = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Products</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3 Items</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$ 155.36</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Taxes (15%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$ 32.33</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant='subtitle1'>Total:</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>$ 232.33</Typography>
            </Grid>
        </Grid>
    );
}