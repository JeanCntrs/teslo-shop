import { Box } from "@mui/system";
import Head from "next/head";

interface AuthLayoutProps {
    title: string;
    children?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
                    {children}
                </Box>
            </main>
        </>
    );
}