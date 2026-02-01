const LogoCarousel = () => {
    const logos = [
        { type: 'img', src: '/circle-whatsapp.svg', alt: 'WhatsApp' },
        { type: 'img', src: '/circle-telegram.svg', alt: 'Telegram' },
        { type: 'icon', class: 'fa-brands fa-google' },
    ];

    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="flex whitespace-nowrap logo-track">
                {/* Set 1: Repeated multiple times for width */}
                <div className="flex items-center gap-12 md:gap-24 px-12">
                    {[...Array(5)].map((_, i) => (
                        <div key={`set1-${i}`} className="flex items-center gap-12 md:gap-24">
                            {logos.map((logo, idx) => (
                                logo.type === 'img' ? (
                                    <img
                                        key={`l1-${i}-${idx}`}
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="w-12 h-12 md:w-16 md:h-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
                                    />
                                ) : (
                                    <i key={`l1-${i}-${idx}`} className={`${logo.class} text-4xl md:text-5xl text-gray-300 hover:text-primary transition-colors cursor-pointer`}></i>
                                )
                            ))}
                        </div>
                    ))}
                </div>
                {/* Set 2: Identical duplicate for seamless loop */}
                <div className="flex items-center gap-12 md:gap-24 px-12">
                    {[...Array(5)].map((_, i) => (
                        <div key={`set2-${i}`} className="flex items-center gap-12 md:gap-24">
                            {logos.map((logo, idx) => (
                                logo.type === 'img' ? (
                                    <img
                                        key={`l2-${i}-${idx}`}
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="w-12 h-12 md:w-16 md:h-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
                                    />
                                ) : (
                                    <i key={`l2-${i}-${idx}`} className={`${logo.class} text-4xl md:text-5xl text-gray-300 hover:text-primary transition-colors cursor-pointer`}></i>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoCarousel;
