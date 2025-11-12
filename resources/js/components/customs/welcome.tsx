const Welcome = () => {
    return (
        <section className="welcome-section container mx-auto px-4 h-auto text-white">
            <div className="container flex flex-col justify-center items-start bg-linear-to-r from-blue-muhi to-green-muhi px-4 text-center w-auto h-48 xl:w-3/4 m-auto md:px-20 rounded-xl">
                <h6 className=" text-lg font-bold md:text-xl">Selamat Datang di</h6>
                <h1 className="text-2xl text-start font-bold md:text-4xl">
                    Perkumpulan Lembaga Sertifikasi Profesi Perguruan Tinggi
                    Muhammadiyah 'Aisiyah
                </h1>
            </div>
        </section>
    );
};
export default Welcome;
