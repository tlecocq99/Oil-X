import React, { useState } from "react";
import {
  TrendingUp,
  Zap,
  Shield,
  Users,
  BarChart3,
  Fuel,
  ArrowRight,
  CheckCircle,
  Globe,
  Coins,
  Target,
  ChevronRight,
} from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const features = [
    {
      icon: <Fuel className="w-6 h-6" />,
      title: "Energy-Backed Utility",
      description:
        "OILX bridges traditional energy markets with DeFi, creating real-world utility and sustainable value.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Transparent",
      description:
        "Built on proven blockchain technology with full transparency and community-driven governance.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Potential",
      description:
        "Strategic positioning in the expanding energy-crypto intersection with substantial upside potential.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Strong Community",
      description:
        "Growing ecosystem of energy professionals, crypto enthusiasts, and forward-thinking investors.",
    },
  ];

  const roadmapItems = [
    { phase: "Q1 2025", title: "Platform Launch", status: "active" },
    { phase: "Q2 2025", title: "Exchange Integration", status: "upcoming" },
    { phase: "Q3 2025", title: "Energy Partnerships", status: "upcoming" },
    { phase: "Q4 2025", title: "Global Expansion", status: "upcoming" },
  ];

  const stats = [
    { label: "Total Supply", value: "100M OILX", trend: "+5.2%" },
    { label: "Market Cap", value: "$2.4M", trend: "+12.8%" },
    { label: "Holders", value: "8,432", trend: "+18.5%" },
    { label: "Trading Volume", value: "$456K", trend: "+24.1%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-amber-900">
      {/* Header */}
      <header className="relative z-50 bg-slate-900/95 backdrop-blur-sm border-b border-amber-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <img
                  src="/oil-x-logo.jpg"
                  alt="OILX Logo"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">OILX</h1>
                <p className="text-xs text-amber-400">Oil Exchange</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#tokenomics"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Tokenomics
              </a>
              <a
                href="#roadmap"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Roadmap
              </a>
              <button
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-2 rounded-full font-semibold hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() =>
                  window.open(
                    "https://moonshot.com/PqXub2t6A2vvUb3Mevk4uhj339rMhhmxq2HQzYNmoon?ref=FRApAfnF2I"
                  )
                }
              >
                Buy OILX
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-slate-900/40"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-8">
              <Zap className="w-4 h-4 text-amber-400 mr-2" />
              <span className="text-amber-400 text-sm font-medium">
                Revolutionary Energy Token
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Future of
              <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent leading-tight pb-2">
                Energy Trading
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              OILX bridges the gap between traditional energy markets and
              decentralized finance, creating unprecedented opportunities for
              investors in the evolving energy landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center"
                onClick={() =>
                  window.open(
                    "https://moonshot.com/PqXub2t6A2vvUb3Mevk4uhj339rMhhmxq2HQzYNmoon?ref=FRApAfnF2I"
                  )
                }
              >
                Invest in OILX
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-amber-500 text-amber-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-500 hover:text-slate-900 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm mb-2">{stat.label}</div>
              <div className="text-green-400 text-xs font-medium flex items-center justify-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.trend}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose OILX?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Discover the compelling advantages that make OILX a strategic
              investment opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-amber-500 mb-4 group-hover:text-amber-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Revolutionizing Energy Investment
              </h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                OILX represents a paradigm shift in how we approach energy
                investment. By leveraging blockchain technology and
                decentralized finance principles, we're creating a more
                accessible, transparent, and efficient way to participate in the
                global energy market.
              </p>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Our token serves as both a utility asset and an investment
                vehicle, providing holders with exposure to energy market
                movements while benefiting from the growth potential of the
                cryptocurrency ecosystem.
              </p>

              <div className="space-y-4">
                {[
                  "Real-world utility in energy trading",
                  "Deflationary tokenomics with supply reduction",
                  "Staking rewards and governance rights",
                  "Strategic partnerships with energy companies",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-amber-500/20 to-slate-800/40 rounded-2xl p-8 backdrop-blur-sm border border-amber-500/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Globe className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">Global</div>
                    <div className="text-slate-400">Market Reach</div>
                  </div>
                  <div className="text-center">
                    <Coins className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">DeFi</div>
                    <div className="text-slate-400">Integration</div>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">
                      Strategic
                    </div>
                    <div className="text-slate-400">Positioning</div>
                  </div>
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">Growth</div>
                    <div className="text-slate-400">Potential</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Tokenomics</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Designed for sustainable growth and long-term value creation
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  100M
                </div>
                <div className="text-slate-300 font-medium mb-2">
                  Total Supply
                </div>
                <div className="text-slate-500 text-sm">
                  Fixed supply with deflationary mechanics
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">2%</div>
                <div className="text-slate-300 font-medium mb-2">
                  Transaction Fee
                </div>
                <div className="text-slate-500 text-sm">
                  1% burn, 1% rewards distribution
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  15%
                </div>
                <div className="text-slate-300 font-medium mb-2">
                  APY Staking
                </div>
                <div className="text-slate-500 text-sm">
                  Competitive rewards for long-term holders
                </div>
              </div>
            </div>

            {/* Token Distribution */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Token Distribution
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Public Sale",
                    percentage: "40%",
                    color: "bg-amber-500",
                  },
                  {
                    label: "Liquidity Pool",
                    percentage: "25%",
                    color: "bg-amber-400",
                  },
                  {
                    label: "Team & Development",
                    percentage: "15%",
                    color: "bg-amber-300",
                  },
                  {
                    label: "Marketing & Partnerships",
                    percentage: "10%",
                    color: "bg-amber-200",
                  },
                  {
                    label: "Reserve Fund",
                    percentage: "10%",
                    color: "bg-amber-100",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 ${item.color} rounded-full mr-3`}
                      ></div>
                      <span className="text-slate-300">{item.label}</span>
                    </div>
                    <span className="text-white font-semibold">
                      {item.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Development Roadmap
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Strategic milestones driving OILX toward mainstream adoption
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roadmapItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                    item.status === "active"
                      ? "bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/20"
                      : "bg-slate-800/30 border-slate-600 hover:border-amber-500/30"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                        item.status === "active"
                          ? "bg-amber-500 text-slate-900"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div className="text-amber-400 font-semibold mb-2">
                      {item.phase}
                    </div>
                    <div className="text-white font-bold mb-3">
                      {item.title}
                    </div>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "active"
                          ? "bg-amber-500 text-slate-900"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {item.status === "active" ? "In Progress" : "Upcoming"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-600/20 to-slate-900/40">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Energy Revolution?
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Don't miss your opportunity to be part of the future of energy
              trading. OILX is positioned for significant growth as we bridge
              traditional energy markets with DeFi innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center"
                onClick={() =>
                  window.open(
                    "https://moonshot.com/PqXub2t6A2vvUb3Mevk4uhj339rMhhmxq2HQzYNmoon?ref=FRApAfnF2I"
                  )
                }
              >
                Buy OILX Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button
                className="border-2 border-slate-400 text-slate-300 px-10 py-4 rounded-full font-bold text-lg hover:border-amber-500 hover:text-amber-400 transition-all duration-200"
                onClick={() => window.open("https://x.com/oilx_change?s=21")}
              >
                Join Community
              </button>
            </div>

            <div className="text-sm text-slate-500">
              * This is not financial advice. Please do your own research before
              investing.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Fuel className="w-5 h-5 text-slate-900" />
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
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Reddit
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Trading</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    PancakeSwap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Uniswap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    CoinGecko
                  </a>
                </li>
                <li>
                  <a
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

export default App;
