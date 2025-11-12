import LandingPageLayout from '@/layouts/landingpage/landingpage-layout';
import Welcome from '@/components/customs/welcome';
const page = () => {
    return (
        <LandingPageLayout>
            <section className="container h-svh pt-10"> 
                <Welcome />
            </section>
        </LandingPageLayout>
    );
};

export default page;
