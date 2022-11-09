import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts';
import { jwt } from '../../utils';

const AddressPage: NextPage = () => {
    return (
        <ShopLayout title='Direction' pageDescription='Confirm destination address'>
            <Typography variant='h1' component='h1'>Direction</Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField label='Name' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Surname' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Address' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Address 2 (Optional)' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Postal Code' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='City' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select
                            variant='filled'
                            label='Country'
                            value={1}
                        >
                            <MenuItem value={1}>Costa Rica</MenuItem>
                            <MenuItem value={2}>Honduras</MenuItem>
                            <MenuItem value={3}>El Salvador</MenuItem>
                            <MenuItem value={4}>Mexico</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Phone' variant='filled' fullWidth />
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button color='secondary' className='circular-btn' size='large'>
                    Review Order
                </Button>
            </Box>
        </ShopLayout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        console.log('Error: ', error);
    }

    if (!isValidToken) {
        return {
            redirect: {
                destination: '/auth/sign-in?p=/checkout/address',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default AddressPage;