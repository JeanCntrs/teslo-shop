import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material";
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { UiContext } from '../../context';

export const Navbar: React.FC = () => {
    const { asPath, push } = useRouter();
    const { changeSidemenu } = useContext(UiContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;

        push(`/search/${searchTerm}`);
    }

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className='fadeIn'>
                    <NextLink href='/category/men' passHref>
                        <Link>
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Men</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref>
                        <Link>
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Women</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kids' passHref>
                        <Link>
                            <Button color={asPath === '/category/kids' ? 'primary' : 'info'}>Kids</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

                {
                    isSearchVisible
                        ?
                        <Input
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            autoFocus
                            className='fadeIn'
                            value={searchTerm}
                            onChange={event => setSearchTerm(event.target.value)}
                            onKeyUp={event => event.key === 'Enter' ? handleSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setIsSearchVisible(false)}
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        :
                        <IconButton
                            className='fadeIn'
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            onClick={() => setIsSearchVisible(true)}
                        >
                            <SearchOutlined />
                        </IconButton>
                }

                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={changeSidemenu}
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={changeSidemenu}>
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    );
}