import { useState, useEffect } from 'react';

const SupportWidget = ({ isOpen, onOpen, onClose, initialPlan }) => {
    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        category: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        if (initialPlan) {
            setFormData(prev => ({
                ...prev,
                category: 'sales',
                message: `${initialPlan} paketi haqqında məlumat almaq istəyirəm.`
            }));
        }
    }, [initialPlan]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Rate limiting check
        const lastSub = localStorage.getItem('last_support_submission');
        const today = new Date().toISOString().split('T')[0];
        if (lastSub === today) {
            alert('Gündə yalnız bir dəstək sorğusu göndərə bilərsiniz.');
            return;
        }

        setIsSending(true);

        try {
            const formattedMessage = `Dəstək İstəyi:\nAd: ${formData.firstName} ${formData.lastName}\nKateqoriya: ${formData.category}\nTelefon: ${formData.phone}\nMesaj: ${formData.message}`;

            const recipients = ['994508300030', '905464233871'];
            const requests = recipients.map(target =>
                fetch(`http://93.180.132.135:2004/message`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'API-KEY-XXXX'
                    },
                    body: JSON.stringify({
                        recipient: target,
                        message: formattedMessage
                    })
                })
            );

            const results = await Promise.all(requests);
            const successes = results.filter(res => res.ok);

            if (successes.length > 0) {
                localStorage.setItem('last_support_submission', today);
                setShowSuccess(true);
                setFormData({ firstName: '', lastName: '', category: '', phone: '', message: '' });
                setTimeout(() => {
                    onClose();
                    setTimeout(() => setShowSuccess(false), 500);
                }, 3000);
            } else {
                throw new Error('API Error');
            }
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Xəta baş verdi. Zəhmət olmasa daha sonra təkrar yoxlayın.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            {/* Support Button */}
            <div className="fixed bottom-6 right-6 z-[3000]">
                <button
                    onClick={() => isOpen ? onClose() : onOpen()}
                    className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform active:scale-95 relative"
                >
                    <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-comments'}`}></i>
                    {!isOpen && <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>}
                </button>
            </div>

            {/* Support Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={onClose}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease-out]">
                        <div className="bg-primary p-6 text-white pb-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-xl font-bold">Dəstək Formu</h4>
                                    <p className="text-white/70 text-sm">Mesajınızı bizə bildirin</p>
                                </div>
                                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors text-xl">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 -mt-6 bg-white rounded-t-[32px]">
                            {!showSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-2">Ad</label>
                                            <input
                                                type="text" required placeholder="Adınız"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full p-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-2">Soyad</label>
                                            <input
                                                type="text" required placeholder="Soyadınız"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full p-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 ml-2">Mövzu</label>
                                        <select
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full p-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm appearance-none"
                                        >
                                            <option value="">Şikayət/İstək növünü seçin</option>
                                            <option value="technical">Texniki Problem</option>
                                            <option value="sales">Satış Görüşməsi</option>
                                            <option value="billing">Ödəniş Sualı</option>
                                            <option value="other">Digər</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 ml-2">GSM</label>
                                        <input
                                            type="tel" required placeholder="+994 -- --- -- --"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full p-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 ml-2">Mesaj</label>
                                        <textarea
                                            required rows="3" placeholder="Problemi qısaca izah edin..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full p-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        disabled={isSending}
                                        type="submit"
                                        className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a0b5a] transition-all group overflow-hidden disabled:opacity-50"
                                    >
                                        <span>{isSending ? 'Göndərilir...' : 'Gönder'}</span>
                                        <i className={`fa-solid fa-paper-plane ${isSending ? 'animate-fly-away' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`}></i>
                                    </button>
                                </form>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-[fadeIn_0.5s_ease-out]">
                                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl animate-bounce">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-bold text-primary">Təşəkkür edirik!</h5>
                                        <p className="text-gray-500 text-sm">Mesajınız uğurla göndərildi. <br /> Tezliklə sizinlə əlaqə saxlayacağıq.</p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-50 text-center">
                                <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
                                    Powered by <span className="text-primary font-bold">HubMSG API</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SupportWidget;
