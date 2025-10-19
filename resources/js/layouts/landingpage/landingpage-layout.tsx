import Navigation from '@/components/customs/navigation';
import Footer from '@/components/customs/footer';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navigation />
            <main className="flex h-auto flex-col items-center antialiased">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default layout;
