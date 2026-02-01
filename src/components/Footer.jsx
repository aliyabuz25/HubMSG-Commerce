const Footer = () => {
    return (
        <footer className="py-12 bg-white border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-sm">
                <div className="logo flex items-center group cursor-pointer select-none">
                    <div className="w-20 md:w-24 h-auto transition-all duration-300">
                        <img src="/sitelogo.png" alt="HubMSG Logo" className="w-full h-auto" />
                    </div>
                </div>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-primary transition-colors">Haqqımızda</a>
                    <a href="#" className="hover:text-primary transition-colors">Xidmət Şərtləri</a>
                    <a href="#" className="hover:text-primary transition-colors">Məxfilik Siyasəti</a>
                </div>
                <div>© 2026 HubMSG. Bütün hüquqlar qorunur.</div>
            </div>
        </footer>
    );
};

export default Footer;
