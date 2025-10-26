import Footer from '@/components/customs/footer';
import NavBar from '@/components/customs/nav-bar';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
            <main className="flex h-auto flex-col items-center pt-14 antialiased">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default layout;
