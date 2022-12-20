import NextLink from 'next/link';
import { useContext } from 'react';
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import { UiContext } from '../../context';

export const AdminNavbar: React.FC = () => {
    const { changeSidemenu } = useContext(UiContext);

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

                <Button onClick={changeSidemenu}>
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    );
}