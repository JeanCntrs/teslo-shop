import Head from "next/head";
import { Navbar, SideMenu } from "../ui";

interface ShopLayoutProps {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children?: React.ReactNode;
}

export const ShopLayout: React.FC<ShopLayoutProps> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                {
                    imageFullUrl && <meta name="og:image" content={imageFullUrl} />
                }
            </Head>

            <nav>
                <Navbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440',
                padding: '0px 30px'
            }}>
                {children}
            </main>

            <footer>

            </footer>
        </>
    );
}