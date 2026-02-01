const Navbar = ({ onLangClick }) => {
    return (
        <header className="fixed top-0 w-full z-[1000] px-6 py-4 md:px-14 md:py-6 nav-blur">
            <nav className="max-w-[1400px] mx-auto flex justify-between items-center text-sm md:text-base">
                <div className="logo flex items-center group cursor-pointer select-none">
                    <div className="w-24 md:w-32 h-auto transition-all duration-500 overflow-hidden">
                        <img src="/sitelogo.png" alt="HubMSG Logo" className="w-full h-auto" />
                    </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    <div
                        onClick={onLangClick}
                        className="lang-selector text-xl cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <i className="fa-solid fa-globe"></i>
                    </div>
                    <div className="w-[1.5px] h-5 bg-primary/10"></div>
                    <a
                        href="http://hubmsgpanel.octotech.az/admin"
                        className="px-6 py-2 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/10 hover:bg-[#1a0b5a] hover:-translate-y-0.5 transition-all"
                    >
                        Yönetim Girişi
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
