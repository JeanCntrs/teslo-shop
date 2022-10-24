import NextLink from 'next/link';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import { AuthLayout } from '../../components/layouts';

const SignInPage: NextPage = () => {
    return (
        <AuthLayout title='Sign In'>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} display='flex' justifyContent='center'>
                        <Typography variant='h1' component='h1'>Sign In</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Email' variant='filled' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Password' variant='filled' type='password' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Button color='secondary' className='circular-btn' size='large' fullWidth>
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
        </AuthLayout>
    );
}

export default SignInPage;