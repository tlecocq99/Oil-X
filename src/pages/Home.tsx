import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Zap,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Globe,
  Coins,
  Target,
  ChevronRight,
  Clock,
  Milestone,
} from "lucide-react";

type RoadmapStatus = "completed" | "active" | "upcoming";

interface Milestone {
  task: string;
  completed: boolean;
}

interface RoadmapPhase {
  phase: string;
  title: string;
  status: RoadmapStatus;
  progress: number;
  milestones: Milestone[];
}

export default function Home() {
  const features = [
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

  const stats = [
    {
      label: "Total Supply",
      value: "1.0B OILX",
      icon: <Coins className="w-4 h-4" />,
      trend: "",
    },
    {
      label: "Market Cap",
      value: "$2.4M",
      icon: <TrendingUp className="w-4 h-4" />,
      trend: "",
    },
    {
      label: "Holders",
      value: "<1,000",
      icon: <Users className="w-4 h-4" />,
      trend: "",
    },
    {
      label: "Trading Volume",
      value: "$456K",
      icon: <BarChart3 className="w-4 h-4" />,
      trend: "",
    },
  ];

  const roadmapData: RoadmapPhase[] = [
    {
      phase: "Q1 2025",
      title: "Foundation & Launch",
      status: "active",
      progress: 95,
      milestones: [
        {
          task: "Launch OILX Coin + establish liquidity.",
          completed: true,
        },
        {
          task: "Secure branding (logo, visual identity, community channels).",
          completed: true,
        },
        {
          task: "Deploy maximum amount of social media presence on ✅X(Twitter), ✅Discord, ❌TikTok, etc.",
          completed: false,
        },
        {
          task: "Website and Whitepaper release.",
          completed: true,
        },
        {
          task: "Initial community growth via giveaways, promotions.",
          completed: true,
        },
      ],
    },
    {
      phase: "Q2 2025",
      title: "Exchange Integration",
      status: "upcoming",
      progress: 0,
      milestones: [
        { task: "Introduction of Board Team", completed: false },
        {
          task: "Community AMAs and holder highlights",
          completed: false,
        },
        { task: "First Marketing Giveaways", completed: false },
        {
          task: "Grow to 5k+ Holders and 20k plus followers across all major platforms",
          completed: false,
        },
      ],
    },
    {
      phase: "Q3 2025",
      title: "Energy Partnerships",
      status: "upcoming",
      progress: 0,
      milestones: [
        {
          task: "Enhanced reinvestment strategy→Deflationary Pressure: Potential coin burns or supply control to boost scarcity.",
          completed: false,
        },
        { task: "Potential Partnerships", completed: false },
        {
          task: "Broader exchange listings (Coinbase, Robinhood, Binance, Crypto.com etc.)",
          completed: false,
        },
      ],
    },
    {
      phase: "Q4 2025",
      title: "Global Expansion",
      status: "upcoming",
      progress: 0,
      milestones: [
        {
          task: "Scaling opportunities under review with Creator and Advisory Board. TBA",
          completed: false,
        },
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-slate-900/40"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-8">
              <Zap className="w-4 h-4 text-amber-400 mr-2" />
              <span className="text-amber-400 text-sm font-medium">
                OILX is live on Moonshot!
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Investing In The Future
              <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent leading-tight pb-2">
                With Strength From The Past
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              OILX is a community-driven, on-chain coin with transparent
              mechanics and real-time analytics — empowering holders in an
              ever-changing decentralized crypto economy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                target="_blank"
                href="https://moonshot.com/?ref=CMpjXUTqvY"
                className="flex items-center"
              >
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center">
                  Invest in OILX
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </a>
              <Link
                to="/whitepaper"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-500 hover:text-slate-900 transition-all duration-200 inline-block"
              >
                Whitepaper
              </Link>
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
              <div className="text-amber-400 mb-2 flex justify-center">
                {stat.icon}
              </div>
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
      <section className="py-20 px-6 bg-slate-800/30">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Quick About Preview */}
      <section className="py-20 px-6">
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

              <div className="space-y-4 mb-8">
                {[
                  "Deflationary tokenomics with supply reduction",
                  "Governance rights",
                  "Strategic partnerships with energy companies",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/whitepaper"
                className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-3 rounded-full font-semibold hover:from-amber-400 hover:to-amber-500 transition-all duration-200"
              >
                Learn More About OILX
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
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

      {/* Roadmap Section */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Development Roadmap
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Our strategic path to revolutionizing energy trading through
              blockchain innovation
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roadmapData.map((roadmapPhase: RoadmapPhase, index: number) => (
                <div key={index} className="relative">
                  <div
                    className={`bg-slate-800/50 backdrop-blur-sm border-2 rounded-xl p-6 transition-all duration-300 ${
                      roadmapPhase.status === "completed"
                        ? "border-green-500 shadow-lg shadow-green-500/20"
                        : roadmapPhase.status === "active"
                        ? "border-amber-500 shadow-lg shadow-amber-500/20"
                        : "border-slate-600 hover:border-amber-500/30"
                    }`}
                  >
                    <div className="text-center mb-4">
                      <div className="text-amber-400 font-semibold text-sm">
                        {roadmapPhase.phase}
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {roadmapPhase.title}
                      </h3>
                    </div>

                    {/* Milestone Checklist */}
                    <div className="mb-4">
                      <div className="space-y-2">
                        {roadmapPhase.milestones.map(
                          (milestone: Milestone, mIndex: number) => (
                            <div
                              key={mIndex}
                              className="flex items-center text-sm"
                            >
                              <div
                                className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center flex-shrink-0 ${
                                  milestone.completed
                                    ? "bg-green-500"
                                    : "bg-slate-600 border border-slate-500"
                                }`}
                              >
                                {milestone.completed && (
                                  <svg
                                    className="w-2.5 h-2.5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span
                                className={`${
                                  milestone.completed
                                    ? "text-slate-300"
                                    : "text-slate-400"
                                }`}
                              >
                                {milestone.task}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-xs">Progress</span>
                        <span className="text-amber-400 font-semibold text-xs">
                          {roadmapPhase.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${roadmapPhase.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-4 ${
                        roadmapPhase.status === "completed"
                          ? "bg-green-500 text-white"
                          : roadmapPhase.status === "active"
                          ? "bg-amber-500 text-slate-900"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {roadmapPhase.status === "completed" ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </>
                      ) : roadmapPhase.status === "active" ? (
                        <>
                          <Zap className="w-3 h-3 mr-1" />
                          In Progress
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Upcoming
                        </>
                      )}
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
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center">
                Buy OILX Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <Link
                to="/community"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-500 hover:text-slate-900 transition-all duration-200 inline-block"
              >
                Join Community
              </Link>
            </div>

            <div className="text-sm text-slate-500">
              * This is not financial advice. Please do your own research before
              investing.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
