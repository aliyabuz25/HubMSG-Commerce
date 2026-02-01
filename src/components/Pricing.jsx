const Pricing = ({ onSelectPlan }) => {
    const plans = [
        {
            name: "Başlanğıc",
            desc: "Kiçik komandalar üçün",
            priceLabel: "Fərdi Qiymət",
            features: ["3 WhatsApp Nömrəsi", "1000 Mesaj/Gün", "Ortaq Panel Dəstəyi"],
            missing: ["Reklam API İntegurasiyası"],
            button: "Bizimlə Əlaqə",
            highlight: false
        },
        {
            name: "Professional",
            desc: "Böyüyən bizneslər üçün",
            priceLabel: "Fərdi Qiymət",
            features: ["6 WhatsApp Nömrəsi", "Limitsiz Mesajlaşma", "Reklam API & Flows", "7/24 VIP Dəstək"],
            missing: [],
            button: "Bizimlə Əlaqə",
            highlight: true
        },
        {
            name: "Korporativ",
            desc: "Genişmiqyaslı həllər",
            priceLabel: "Fərdi Qiymət",
            features: ["9 WhatsApp Nömrəsi", "Fərdi İnteqrasiyalar", "Ağ Etiket (White Label)", "Xüsusi Server İmkanları"],
            missing: [],
            button: "Bizimlə Əlaqə",
            highlight: false
        }
    ];

    return (
        <section className="reveal py-20 bg-[#fbfaff]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary tracking-tight">
                        Şəffaf Paketlər, Güclü İnfrastruktur
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-10">
                        Ehtiyacınıza uyğun olanı seçin. Ətraflı məlumat üçün bizimlə əlaqə saxlayın.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-[32px] p-10 border transition-all duration-300 flex flex-col ${plan.highlight
                                ? 'border-2 border-primary shadow-2xl scale-105 z-10'
                                : 'border-black/5 hover:shadow-xl'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                                    Ən Çox Seçilən
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-primary mb-2">{plan.name}</h3>
                                <p className="text-gray-400 text-sm">{plan.desc}</p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-primary">{plan.priceLabel}</h3>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow text-left">
                                {plan.features.map((feat, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-600">
                                        <i className="fa-solid fa-check text-green-500"></i> {feat}
                                    </li>
                                ))}
                                {plan.missing.map((feat, mIdx) => (
                                    <li key={mIdx} className="flex items-center gap-3 text-sm text-gray-400 line-through">
                                        <i className="fa-solid fa-xmark"></i> {feat}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => onSelectPlan && onSelectPlan(plan.name)}
                                className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.highlight
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-[#1a0b5a]'
                                    : 'border-2 border-black/10 text-primary hover:bg-primary hover:text-white hover:border-primary'
                                    }`}
                            >
                                {plan.button}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
