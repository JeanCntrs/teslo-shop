import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import { countries } from '../../utils';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || ''
    }
}

const AddressPage: NextPage = () => {
    const router = useRouter();
    const { updateAddress } = useContext(CartContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            firstName:'',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: countries[0].code,
            phone: '',
        }
    });

    useEffect(() => {
        reset(getAddressFromCookies());
    }, [reset])


    const handleSubmitAddress = (data: FormData) => {
        updateAddress(data);

        router.push('/checkout/summary');
    }

    return (
        <ShopLayout title='Direction' pageDescription='Confirm destination address'>
            <form onSubmit={handleSubmit(handleSubmitAddress)}>
                <Typography variant='h1' component='h1'>Direction</Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Name'
                            variant='filled'
                            fullWidth
                            {
                            ...register('firstName', {
                                required: 'This field is required'
                            })
                            }
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Surname'
                            variant='filled'
                            fullWidth
                            {
                            ...register('lastName', {
                                required: 'This field is required'
                            })
                            }
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Address'
                            variant='filled'
                            fullWidth
                            {
                            ...register('address', {
                                required: 'This field is required'
                            })
                            }
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Address 2 (Optional)'
                            variant='filled'
                            fullWidth
                            {
                            ...register('address2')
                            }

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Postal Code'
                            variant='filled'
                            fullWidth
                            {
                            ...register('zip', {
                                required: 'This field is required'
                            })
                            }
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='City'
                            variant='filled'
                            fullWidth
                            {
                            ...register('city', {
                                required: 'This field is required'
                            })
                            }
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* <FormControl fullWidth> */}
                        <TextField
                            // select
                            variant='filled'
                            label='Country'
                            fullWidth
                            // defaultValue={Cookies.get('country') || countries[0].code}
                            {
                            ...register('country', {
                                required: 'This field is required'
                            })
                            }
                            error={!!errors.country}
                            helperText={errors.country?.message}
                        >
                            {/* {
                                countries.map(country => (
                                    <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                                ))
                            } */}
                        </TextField>
                        {/* </FormControl> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Phone'
                            variant='filled'
                            fullWidth
                            {
                            ...register('phone', {
                                required: 'This field is required'
                            })
                            }
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type='submit' color='secondary' className='circular-btn' size='large'>
                        Review Order
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// getServerSideProps makes our page run under request time / no static
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken(token);
//         isValidToken = true;
//     } catch (error) {
//         console.log('Error: ', error);
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/sign-in?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }

export default AddressPage;