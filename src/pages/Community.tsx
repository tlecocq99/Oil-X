import {
  Users,
  MessageCircle,
  Twitter,
  Send,
  Github,
  Globe,
  Heart,
  Star,
  TrendingUp,
  Award,
  Zap,
  Target,
} from "lucide-react";
import twitterLogo from "../public/X-logo.png";

export default function Community() {
  const socialChannels = [
    {
      icon: <Send className="w-8 h-8" />,
      name: "Telegram [TBA]",
      description:
        "Join our main community chat for real-time discussions and updates",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      name: "Discord",
      description:
        "Connect with fellow OILX holders and participate in community events",
      link: "https://discord.gg/enf2FzGS6n",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <img src={twitterLogo} className="w-8 h-8" />,
      name: "X",
      description:
        "Follow us for the latest news, updates, and market insights",
      link: "https://x.com/OILX_CHANGE",
      color: "black",
    },
  ];

  const communityStats = [
    {
      label: "Total Members",
      value: "25,000+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Daily Active Users",
      value: "3,200+",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    { label: "Countries", value: "85+", icon: <Globe className="w-6 h-6" /> },
    {
      label: "Community Score",
      value: "9.2/10",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  const communityPrograms = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Discord Community Mod Program",
      description: "Become a Discord moderator and earn exclusive benefits.",
      benefits: [
        "OILX giveaways",
        "Exclusive access to events",
        "Direct team communication",
      ],
      status: "Open Applications",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Milestone Giveaways",
      description: "Earn rewards by contributing to market cap milestones.",
      benefits: ["Tune in to X and for giveaway announcements."],
      status: "Active",
    },
  ];

  const events = [
    {
      date: "Tune in to Discord for information",
      title: "OILX Community AMA",
      description: "Monthly Ask Me Anything session with the core team",
      type: "Virtual Event",
    },
    {
      date: "Tune in to Discord for information",
      title: "Partnership Unveiling",
      description: "Major partnership reveal with Q&A session",
      type: "Reveal",
    },
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-8">
              <Heart className="w-4 h-4 text-amber-400 mr-2" />
              <span className="text-amber-400 text-sm font-medium">
                OILX Community
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Join the
              <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                OILX Revolution
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Connect with thousands of like-minded investors, crypto
              professionals, and blockchain enthusiasts who are building the
              future of crypto trading together.
            </p>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      {/*
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Community by the Numbers
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Our growing global community spans across continents and
              industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 text-center hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="text-amber-500 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Social Channels */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Connect With Us
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Join our vibrant community across multiple platforms and stay
              updated with the latest developments
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {socialChannels.map((channel, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-8 hover:border-amber-500/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${channel.color} text-white flex-shrink-0`}
                  >
                    {channel.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-semibold text-white">
                        {channel.name}
                      </h3>
                    </div>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {channel.description}
                    </p>
                    <a
                      href={channel.link}
                      target="_blank"
                      className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors"
                    >
                      Join Now
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Programs */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Community Programs
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Get involved and earn rewards while contributing to the OILX
              ecosystem
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {communityPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-8 hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="text-amber-500 mb-4">{program.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {program.title}
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-2 mb-6">
                  {program.benefits.map((benefit, bIndex) => (
                    <div
                      key={bIndex}
                      className="flex items-center text-slate-300 text-sm"
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                      {benefit}
                    </div>
                  ))}
                </div>

                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    program.status === "Active" ||
                    program.status === "Open Applications"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {program.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Don't miss out on our community events, AMAs, and educational
              sessions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-amber-400 font-semibold">
                        {event.date}
                      </span>
                      <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full text-xs font-medium">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-300">{event.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-2 rounded-full font-semibold hover:from-amber-400 hover:to-amber-500 transition-all duration-200">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-600/20 to-slate-900/40">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Community Guidelines
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Our community thrives on respect, collaboration, and shared
              passion for energy innovation. Here's how we maintain a positive
              environment for everyone.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
                <Heart className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Be Respectful
                </h3>
                <p className="text-slate-300 text-sm">
                  Treat all community members with kindness and respect
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
                <Target className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Stay On Topic
                </h3>
                <p className="text-slate-300 text-sm">
                  Keep discussions relevant to OILX and crypto trading
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
                <Star className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Share Knowledge
                </h3>
                <p className="text-slate-300 text-sm">
                  Help others learn and grow in the energy-crypto space
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
                <Users className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  No Financial Advice
                </h3>
                <p className="text-slate-300 text-sm">
                  Share insights, not investment recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
