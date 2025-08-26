import React from "react";
import {
  Coins,
  TrendingUp,
  Shield,
  Users,
  Zap,
  PieChart,
  Lock,
  Target,
  BarChart3,
} from "lucide-react";

export default function Tokenomics() {
  const tokenMetrics = [
    {
      label: "Circulating Supply",
      value: "1.0B OILX",
      icon: <Coins className="w-6 h-6" />,
    },
    {
      label: "Transaction Fee",
      value: "1%-2.5%",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  {
    /*const distribution = [
    {
      label: "Public Sale",
      percentage: "40%",
      amount: "40M OILX",
      color: "bg-amber-500",
      description: "Available for public purchase and trading",
    },
    {
      label: "Liquidity Pool",
      percentage: "25%",
      amount: "25M OILX",
      color: "bg-amber-400",
      description: "Ensures stable trading and price discovery",
    },
    {
      label: "Team & Development",
      percentage: "15%",
      amount: "15M OILX",
      color: "bg-amber-300",
      description: "Locked for 2 years, vested over 4 years",
    },
    {
      label: "Marketing & Partnerships",
      percentage: "10%",
      amount: "10M OILX",
      color: "bg-amber-200",
      description: "Strategic partnerships and marketing initiatives",
    },
    {
      label: "Reserve Fund",
      percentage: "10%",
      amount: "10M OILX",
      color: "bg-amber-100",
      description: "Emergency fund and future development",
    },
  ];*/
  }

  const mechanisms = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Deflationary Model",
      description:
        "Working plans for periodic token burns funded by platform revenues.",
      benefit: "Increases token value through supply reduction",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Holder Rewards [TBA]",
      description: "*More information coming soon!*",
      benefit: "[TBA]",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Staking Rewards [TBA]",
      description:
        "Stake your OILX tokens to earn additional rewards and participate in governance decisions.",
      benefit: "[TBA]",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Utility Integration",
      description:
        "Trading revenues immediately reinvested into the crypto ecosystem to enhance value and bolster the currency's growth.",
      benefit: "Creates consistent, passive growth for OILX",
    },
  ];

  /* const vestingSchedule = [
    { category: "Public Sale", unlock: "Immediate", percentage: "100%" },
    { category: "Liquidity Pool", unlock: "Immediate", percentage: "100%" },
    {
      category: "Team Tokens",
      unlock: "2 Year Cliff",
      percentage: "25% yearly",
    },
    {
      category: "Marketing",
      unlock: "6 Month Cliff",
      percentage: "25% quarterly",
    },
    {
      category: "Reserve Fund",
      unlock: "As Needed",
      percentage: "Governance Controlled",
    },
  ]; */

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-8">
              <Coins className="w-4 h-4 text-amber-400 mr-2" />
              <span className="text-amber-400 text-sm font-medium">
                OILX Tokenomics
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Designed for
              <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Sustainable Growth
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              OILX tokenomics are carefully crafted to reward long-term holders,
              create sustainable value, and drive adoption through decentralized
              finance utility in crypto markets.
            </p>
          </div>
        </div>
      </section>

      {/* Token Metrics */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Token Metrics
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Key numbers that define the OILX token economy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tokenMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 text-center hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="text-amber-500 mb-4 flex justify-center">
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-slate-400 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*{ Token Distribution 
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Token Distribution</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Transparent allocation designed to ensure long-term project success
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Distribution Chart Representation
              <div className="relative">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Distribution Breakdown</h3>
                  
                  {/* Visual representation
                  <div className="space-y-4">
                    {distribution.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{item.label}</span>
                          <span className="text-amber-400 font-bold">{item.percentage}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <div 
                            className={`${item.color} h-3 rounded-full transition-all duration-1000`}
                            style={{ width: item.percentage }}
                          ></div>
                        </div>
                        <div className="text-slate-400 text-sm mt-1">{item.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Distribution Details
              <div className="space-y-6">
                {distribution.map((item, index) => (
                  <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <div className={`w-4 h-4 ${item.color} rounded-full mr-3`}></div>
                      <h4 className="text-xl font-semibold text-white">{item.label}</h4>
                      <span className="ml-auto text-amber-400 font-bold">{item.percentage}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{item.description}</p>
                    <div className="text-slate-400 text-xs mt-2">{item.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Economic Mechanisms */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Economic Mechanisms
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built-in features that create value and reward participation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mechanisms.map((mechanism, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-8 hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="text-amber-500 mb-4">{mechanism.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {mechanism.title}
                </h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {mechanism.description}
                </p>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  <div className="text-amber-400 font-semibold text-sm">
                    Benefit:
                  </div>
                  <div className="text-white text-sm">{mechanism.benefit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* {/* Vesting Schedule
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Vesting Schedule
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Transparent unlock schedule ensures long-term commitment and
              stability
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Unlock Schedule
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Release Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vestingSchedule.map((item, index) => (
                      <tr key={index} className="border-t border-slate-600/30">
                        <td className="px-6 py-4 text-slate-300 font-medium">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          {item.unlock}
                        </td>
                        <td className="px-6 py-4 text-amber-400 font-medium">
                          {item.percentage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Value Proposition */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-600/20 to-slate-900/40">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why OILX Tokenomics Work
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Our tokenomics model is designed to create a sustainable ecosystem
              that benefits all participants
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
                <BarChart3 className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Deflationary Pressure [TBA]
                </h3>
                <p className="text-slate-300 text-sm">
                  Continuous token burns reduce supply, creating upward pressure
                  on price over time.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
                <Users className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Holder Incentives
                </h3>
                <p className="text-slate-300 text-sm">
                  Giveaways and potential staking benefits encourage long-term
                  holding and reduce selling pressure.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
                <Target className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Real Utility
                </h3>
                <p className="text-slate-300 text-sm">
                  Utility in crypto trading creates genuine demand beyond
                  speculation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
