const Welcome = () => {
    return (
        <section className="welcome-section container mx-auto h-auto text-white flex justify-center">
            <div className="container m-auto flex flex-col justify-center items-start bg-linear-to-r from-blue-muhi to-green-muhi px-4 text-center w-auto h-30 sm:rounded-md  md:h-36 md:px-20 md:rounded-xl md:mx-2 xl:w-3/4">
                <h6 className=" text-xs font-normal md:text-xl ">Selamat Datang di</h6>
                <h1 className="text-md text-start font-bold sm:text-xl md:text-2xl xl:text-3xl">
                    Perkumpulan Lembaga Sertifikasi Profesi Perguruan Tinggi
                    Muhammadiyah 'Aisiyah
                </h1>
            </div>
        </section>
    );
};
export default Welcome;
