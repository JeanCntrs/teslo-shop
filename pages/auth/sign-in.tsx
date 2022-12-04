import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import { Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import { AuthLayout } from '../../components/layouts';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';

type FormData = {
    email: string,
    password: string
};

const SignInPage: NextPage = () => {
    const router = useRouter();

    const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov);
        })
    }, [])


    const handleLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);

        // const isValidLogin = await loginUser(email, password);

        // if (!isValidLogin) {
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 5000);
        //     return;
        // }

        // // So that it does not return to the previous page we use replace
        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination);

        await signIn('credentials', { email, password });
    }

    return (
        <AuthLayout title='Sign In'>
            <form onSubmit={handleSubmit(handleLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <Typography variant='h1' component='h1'>Sign In</Typography>
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
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <NextLink
                                href={router.query.p ? `/auth/sign-up?p=${router.query.p}` : '/auth/sign-up'}
                                passHref
                            >
                                <Link underline='always'>
                                    Don&apos;t have an account?
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values(providers).map((provider: any) => {

                                    if (provider.id === 'credentials') return <div key='credentials'></div>;

                                    return (
                                        <Button
                                            key={provider.id}
                                            variant="outlined"
                                            fullWidth
                                            color='primary'
                                            sx={{ mb: 1 }}
                                            onClick={() => signIn(provider.id)}
                                        >
                                            {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });

    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default SignInPage;