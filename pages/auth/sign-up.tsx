import NextLink from 'next/link';
import { Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import { AuthLayout } from '../../components/layouts';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const SignUpPage: NextPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)

    const handleSignUpForm = async ({ name, email, password }: FormData) => {
        setShowError(false);
        try {
            const { data } = await tesloApi.post('/users/register', { name, email, password });
            const { token, user } = data;
            console.log({ token, user });
        } catch (error) {
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);

            console.log('Something went wrong')
        }
    }
    return (
        <AuthLayout title='Sign Up'>
            <form onSubmit={handleSubmit(handleSignUpForm)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <Typography variant='h1' component='h1'>Sign Up</Typography>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <Chip
                                label='Invalid email / password'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Username'
                                variant='filled'
                                fullWidth
                                {
                                ...register('name', {
                                    required: 'This field is required',
                                    minLength: { value: 2, message: 'Min 2 characters' }
                                })
                                }
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Email'
                                variant='filled'
                                type='email'
                                fullWidth
                                {

                                ...register('email', {
                                    required: 'This field is required',
                                    validate: (value) => validations.isEmail(value)
                                })
                                }
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Password'
                                variant='filled'
                                type='password'
                                fullWidth
                                {
                                ...register('password', {
                                    required: 'This field is required',
                                    minLength: { value: 6, message: 'Min 6 characters' }
                                })
                                }
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                                Create account
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <NextLink href='/auth/sign-in' passHref>
                                <Link underline='always'>
                                    Already have an account?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
}

export default SignUpPage;