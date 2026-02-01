import { useState } from 'react';

const APITest = () => {
    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({ phone: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setShowSuccess(false);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/message`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'text/plain',
                    'x-api-key': import.meta.env.VITE_API_KEY
                },
                body: JSON.stringify({
                    recipient: formData.phone.replace(/\D/g, ''),
                    message: formData.message
                })
            });

            if (response.ok) {
                setShowSuccess(true);
                setFormData({ phone: '', message: '' });
                setTimeout(() => setShowSuccess(false), 5000);
            } else {
                alert('API hatası. Lütfen anahtarınızı ve linkinizi kontrol edin.');
            }
        } catch (error) {
            console.error('API Test Error:', error);
            alert('Bağlantı hatası.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="reveal py-10 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="bg-[#0d0630] rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden text-white">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-bolt text-accent text-2xl"></i>
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">API Test Aləti</h3>
                        </div>
                        <p className="text-white/70 text-lg leading-relaxed">
                            HubMSG API infrastrukturunun gücünü indi real vaxtda yoxlayın. Nömrəni daxil edin və mesajın
                            saniyələr içində necə çatdığını görün. Geliştiricilər üçün hazırlanmış sürətli və etibarlı bağlantı.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-2 text-accent/80 text-xs font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                Live API Access
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-md">
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[32px] border border-white/10">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Telefon Nömrəsi</label>
                                    <input
                                        type="tel"
                                        placeholder="+994 -- --- -- --"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full mt-2 p-4 bg-white/5 rounded-2xl border-2 border-transparent focus:border-accent/30 outline-none transition-all text-white font-medium placeholder:text-white/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Test Mesajı</label>
                                    <textarea
                                        placeholder="Bura mesajınızı daxil edin..."
                                        required
                                        rows="2"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full mt-2 p-4 bg-white/5 rounded-2xl border-2 border-transparent focus:border-accent/30 outline-none transition-all text-white font-medium resize-none placeholder:text-white/20"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full py-4 bg-accent text-primary rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white transition-all shadow-lg shadow-accent/5 disabled:opacity-50"
                                >
                                    {isSending ? (
                                        <><i className="fa-solid fa-spinner animate-spin"></i> Göndərilir...</>
                                    ) : (
                                        <><span>Mesajı Göndər</span><i className="fa-solid fa-paper-plane text-sm"></i></>
                                    )}
                                </button>
                            </form>

                            {showSuccess && (
                                <div className="mt-4 p-3 rounded-xl bg-accent/10 text-accent text-xs font-bold flex items-center justify-center gap-2 animate-[fadeIn_0.3s_ease-out]">
                                    <i className="fa-solid fa-circle-check"></i>
                                    Mesaj başarıyla sıraya alındı!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default APITest;
