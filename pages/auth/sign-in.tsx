import NextLink from 'next/link';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import { AuthLayout } from '../../components/layouts';
import { useForm } from 'react-hook-form';

type FormData = {
    email: string,
    password: string
};

const SignInPage: NextPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const handleLoginUser = (data: FormData) => {
        console.log('data', data)
    }

    return (
        <AuthLayout title='Sign In'>
            <form onSubmit={handleSubmit(handleLoginUser)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <Typography variant='h1' component='h1'>Sign In</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label='Email' variant='filled' type='email' fullWidth {...register('email')} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label='Password' variant='filled' type='password' fullWidth {...register('password')} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <NextLink href='/auth/sign-up' passHref>
                                <Link underline='always'>
                                    Don&apos;t have an account?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
}

export default SignInPage;