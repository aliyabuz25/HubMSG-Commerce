import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import AICRM from './components/AICRM'
import Chatbot from './components/Chatbot'
import APITest from './components/APITest'
import BrandCarousel from './components/BrandCarousel'
import Pricing from './components/Pricing'
import LogoCarousel from './components/LogoCarousel'
import CTA from './components/CTA'
import Footer from './components/Footer'
import LanguageModal from './components/LanguageModal'
import SupportWidget from './components/SupportWidget'

function App() {
    const [isLangModalOpen, setIsLangModalOpen] = useState(false)
    const [isSupportOpen, setIsSupportOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [currentLang, setCurrentLang] = useState('az')
    const [isTranslating, setIsTranslating] = useState(false)

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const translatePage = async (targetLang) => {
        if (window.location.protocol === 'file:') {
            alert('Çeviri xidməti (Google Translate) fayl protokolunda (file://) bəzən bloklana bilər. Ən yaxşı nəticə üçün saytı bir server üzərindən açın.');
        }

        setIsTranslating(true);
        try {
            const textNodes = [];
            const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    const tag = parent.tagName.toLowerCase();
                    if (['script', 'style', 'i', 'code'].includes(tag)) return NodeFilter.FILTER_REJECT;
                    if (parent.closest('#lang-modal') || parent.closest('#translation-loader') || parent.closest('.logo') || parent.closest('.fa-brands') || parent.closest('.notranslate')) return NodeFilter.FILTER_REJECT;
                    if (node.textContent.trim().length < 2) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            });

            let node;
            while (node = walk.nextNode()) {
                textNodes.push(node);
            }

            const batchSize = 25;
            for (let i = 0; i < textNodes.length; i += batchSize) {
                const batch = textNodes.slice(i, i + batchSize);
                const joinedText = batch.map(n => n.textContent.trim().replace(/\n/g, ' ')).join('\n');

                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(joinedText)}`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data && data[0]) {
                        let translatedFull = "";
                        data[0].forEach(segment => {
                            if (segment[0]) translatedFull += segment[0];
                        });

                        const translatedLines = translatedFull.split('\n');
                        batch.forEach((node, idx) => {
                            if (translatedLines[idx] && translatedLines[idx].trim()) {
                                node.textContent = translatedLines[idx].trim();
                            }
                        });
                    }
                } catch (e) {
                    console.error('Batch translation error:', e);
                }
            }
            setCurrentLang(targetLang);
        } catch (error) {
            console.error('General translation error:', error);
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <div className="font-outfit text-primary bg-white overflow-x-hidden leading-relaxed">
            <Navbar onLangClick={() => setIsLangModalOpen(true)} />

            <main>
                <Hero />
                <Features />

                <section className="py-10 bg-white">
                    <div className="max-w-[1200px] mx-auto px-6 space-y-8">
                        <AICRM />
                        <Chatbot />
                    </div>
                </section>

                <APITest />
                <BrandCarousel />
                <Pricing onSelectPlan={(plan) => {
                    setSelectedPlan(plan);
                    setIsSupportOpen(true);
                }} />
                <LogoCarousel />
                <CTA />
            </main>

            <Footer />

            <LanguageModal
                isOpen={isLangModalOpen}
                onClose={() => setIsLangModalOpen(false)}
                onSelectLang={(lang) => {
                    translatePage(lang);
                    setIsLangModalOpen(false);
                }}
            />

            <SupportWidget
                isOpen={isSupportOpen}
                onOpen={() => setIsSupportOpen(true)}
                onClose={() => {
                    setIsSupportOpen(false);
                    setSelectedPlan(null);
                }}
                initialPlan={selectedPlan}
            />

            {isTranslating && (
                <div id="translation-loader" className="fixed inset-0 z-[5000] bg-primary/40 backdrop-blur-md flex items-center justify-center text-white">
                    <div className="flex flex-col items-center gap-4">
                        <i className="fa-solid fa-spinner animate-spin text-4xl text-accent"></i>
                        <p className="font-bold tracking-widest uppercase text-sm">Tərcümə edilir...</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
