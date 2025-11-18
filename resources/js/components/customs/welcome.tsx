const Welcome = () => {
    return (
        <section className=" mx-auto flex h-auto justify-center text-white">
            <div className=" m-auto flex h-30 w-full flex-col items-start justify-center bg-linear-to-r from-blue-muhi to-green-muhi px-4 text-start sm:rounded-md md:mx-2 md:h-36 md:rounded-xl md:px-20 lg:h-44">
                <h6 className="w-full text-xs font-normal md:text-xl">
                    Selamat Datang di
                </h6>
                <h1 className="text-md font-bold sm:text-xl md:text-2xl xl:text-4xl">
                    Perkumpulan Lembaga Sertifikasi Profesi Perguruan Tinggi
                    Muhammadiyah 'Aisiyah
                </h1>
            </div>
        </section>
    );
};
export default Welcome;
