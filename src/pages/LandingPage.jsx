import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Terminal, Zap, Trophy, Swords, Target, Brain } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="relative z-10">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto space-y-8 relative z-10"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl md:text-8xl font-heading font-bold tracking-tight leading-[1.1]"
                    >
                        <span className="block mb-2">Don't Just Track.</span>
                        <span className="block text-gradient animate-gradient">
                            Compete & Dominate.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Track your LeetCode progress, get AI-powered recommendations, and
                        <span className="text-white font-medium"> battle legendary coders in real-time Ghost Mode.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
                    >
                        <Link to="/dashboard" className="group relative px-10 py-5 bg-gradient-to-r from-primary to-primary-glow text-black font-bold text-lg rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-2">
                                Start Tracking Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        <a href="#ghost-mode" className="px-10 py-5 glass-card rounded-xl font-semibold hover:border-red-500/50 transition-all flex items-center gap-2 group border-red-500/20">
                            <Swords className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                            Try Ghost Mode
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-center gap-8 pt-8 text-sm text-white/40"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Real-time Tracking
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            AI Recommendations
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                            Competitive Mode
                        </div>
                    </motion.div>
                </motion.div>

                {/* Floating Code Snippets */}
                <motion.div
                    className="absolute top-1/4 left-10 glass-card p-4 rounded-lg font-mono text-sm text-primary hidden lg:block"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <code>const solve = () =&gt; &#123;</code>
                </motion.div>

                <motion.div
                    className="absolute bottom-1/4 right-10 glass-card p-4 rounded-lg font-mono text-sm text-secondary hidden lg:block"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <code>O(log n)</code>
                </motion.div>
            </section>

            {/* Ghost Mode Showcase */}
            <section id="ghost-mode" className="py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-bold mb-6">
                            <Swords className="w-4 h-4" />
                            FLAGSHIP FEATURE
                        </div>
                        <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">
                            <span className="text-gradient">Ghost Mode</span> - Battle Arena
                        </h2>
                        <p className="text-xl text-white/60 max-w-3xl mx-auto">
                            Race against recorded runs from legendary competitive programmers.
                            Beat their time, climb the leaderboard, and prove you're the fastest.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <GhostFeatureCard
                            icon={<Swords className="w-8 h-8 text-red-400" />}
                            title="1v1 Battles"
                            description="Race against neal_wu, tourist, and other legends. Real-time progress tracking."
                            delay={0.1}
                        />
                        <GhostFeatureCard
                            icon={<Trophy className="w-8 h-8 text-yellow-400" />}
                            title="Leaderboards"
                            description="Top 10 fastest times for every problem. See where you rank globally."
                            delay={0.2}
                        />
                        <GhostFeatureCard
                            icon={<Target className="w-8 h-8 text-primary" />}
                            title="Anti-Cheat"
                            description="Verified with LeetCode's official API. No fake times allowed."
                            delay={0.3}
                        />
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                        >
                            Enter the Arena <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            Everything You Need to <span className="text-gradient">Level Up</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            From tracking to AI insights to competitive battles - all in one place.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Code2 className="w-10 h-10 text-primary" />}
                            title="Smart Analytics"
                            description="Topic-wise breakdown, difficulty analysis, and progress tracking across all DSA categories."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Brain className="w-10 h-10 text-secondary" />}
                            title="AI Coach"
                            description="GPT-4 powered recommendations based on your solving patterns and weak areas."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Terminal className="w-10 h-10 text-accent" />}
                            title="Instant Sync"
                            description="Just enter your LeetCode username. No API keys, no setup, no hassle."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Value Prop / CTA */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
                <div className="max-w-5xl mx-auto glass-card rounded-3xl p-12 text-center relative border border-white/10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        Ready to Compete?
                    </h2>
                    <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                        Join the elite. Track smarter. Battle harder. Become legendary.
                    </p>

                    <Link
                        to="/dashboard"
                        className="inline-block px-10 py-5 bg-white text-black font-bold text-lg rounded-xl hover:scale-105 transition-transform shadow-neon"
                    >
                        Start Your Journey
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 text-center text-white/40 text-sm">
                <p>&copy; 2024 Algoplus. Built with React, Node.js, MongoDB, and AI.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="p-10 rounded-3xl glass-card hover:border-primary/40 transition-all duration-300 group relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
            <motion.div
                className="mb-6 p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl w-fit border border-white/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {icon}
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-white/60 leading-relaxed text-lg">
                {description}
            </p>
        </div>
    </motion.div>
);

const GhostFeatureCard = ({ icon, title, description, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 hover:border-red-500/40 transition-all"
    >
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/60 text-sm">{description}</p>
    </motion.div>
);

export default LandingPage;
