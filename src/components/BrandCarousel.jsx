const BrandCarousel = () => {
    const brands = [
        "JETEX",
        "VADI",
        "VADI GLOBE",
        "FLYEX KARGO"
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 mb-10 text-center">
                <span className="text-primary/60 font-bold tracking-widest uppercase text-sm">Referanslarımız</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2 text-primary tracking-tight">
                    Bizə Güvənənlər
                </h2>
            </div>

            <div className="flex whitespace-nowrap logo-track" style={{ animationDuration: '80s' }}>
                {/* Set 1 */}
                <div className="flex items-center gap-16 md:gap-32 px-12">
                    {[...Array(8)].map((_, i) => (
                        <div key={`set1-${i}`} className="flex items-center gap-16 md:gap-32">
                            {brands.map((brand, idx) => (
                                <span
                                    key={`b1-${i}-${idx}`}
                                    className="text-3xl md:text-4xl font-black text-gray-300 hover:text-primary transition-colors cursor-pointer select-none tracking-tighter notranslate"
                                >
                                    {brand}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
                {/* Set 2 */}
                <div className="flex items-center gap-16 md:gap-32 px-12">
                    {[...Array(8)].map((_, i) => (
                        <div key={`set2-${i}`} className="flex items-center gap-16 md:gap-32">
                            {brands.map((brand, idx) => (
                                <span
                                    key={`b2-${i}-${idx}`}
                                    className="text-3xl md:text-4xl font-black text-gray-300 hover:text-primary transition-colors cursor-pointer select-none tracking-tighter notranslate"
                                >
                                    {brand}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center mt-12 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                <p className="text-gray-400 font-medium text-lg tracking-wide">
                    və onlarla digər marka...
                </p>
            </div>
        </section>
    );
};

export default BrandCarousel;
