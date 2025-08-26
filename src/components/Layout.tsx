import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

//FIX MOBILE MENU

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/whitepaper", label: "Whitepaper" },
    { path: "/tokenomics", label: "Tokenomics" },
    { path: "/community", label: "Community" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-amber-900">
      {/* Header */}
      <header className="relative z-50 bg-slate-900/95 backdrop-blur-sm border-b border-amber-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <img
                  src="src/public/OILK_logo.png"
                  alt="OILX Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">OILX</h1>
                <p className="text-xs text-amber-400">Oil Exchange</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-colors ${
                    isActive(item.path)
                      ? "text-amber-400 font-semibold"
                      : "text-slate-300 hover:text-amber-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-2 rounded-full font-semibold hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-lg hover:shadow-xl">
                Buy OILX
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-slate-300 hover:text-amber-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <img
                    src="src/public/OILK_logo.png"
                    alt="OILX Logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-white">OILX</div>
                  <div className="text-xs text-amber-400">Oil Exchange</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Revolutionizing energy trading through blockchain technology and
                decentralized finance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Tokenomics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Audit Report
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {/*<li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Telegram
                  </a>
                </li>*/}
                <li>
                  <a
                    target="_blank"
                    href="https://discord.gg/enf2FzGS6n"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://x.com/oilx_change?s=21"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                {/*<li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Reddit
                  </a>
                </li>*/}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Trading</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    target="_blank"
                    href="https://rugcheck.xyz/tokens/PqXub2t6A2vvUb3Mevk4uhj339rMhhmxq2HQzYNmoon"
                    className="hover:text-amber-400 transition-colors"
                  >
                    RugCheck
                  </a>
                </li>
                {/*<li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Uniswap
                  </a>
                </li>*/}
                <li>
                  <a
                    target="_blank"
                    href="https://www.geckoterminal.com/solana/pools/9h7GAGU8T75jdD2uHhFGEMHzCLLDXdgireWZho8jgnKp"
                    className="hover:text-amber-400 transition-colors"
                  >
                    GeckoTerminal
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://dex.coinmarketcap.com/token/solana/PqXub2t6A2vvUb3Mevk4uhj339rMhhmxq2HQzYNmoon/"
                    className="hover:text-amber-400 transition-colors"
                  >
                    CoinMarketCap
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 mt-8 text-center text-sm text-slate-500">
            <p>
              &copy; 2025 OILX. All rights reserved. | Not financial advice -
              invest responsibly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
