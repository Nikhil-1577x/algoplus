import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy, Target, Zap, AlertCircle } from 'lucide-react';
import { fetchUserProfile } from '../services/leetcode';
import { getAIRecommendation } from '../services/openai';
import { syncUserToBackend } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [aiRecommendation, setAiRecommendation] = useState(null);
    const [loadingAI, setLoadingAI] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setLoading(true);
        setError(null);
        setUserData(null);
        setAiRecommendation(null);

        try {
            const data = await fetchUserProfile(username);
            setUserData(data);

            // 1. Sync with our Backend (Fire and forget)
            syncUserToBackend(data).then(() => console.log('Synced to Backend'));

            // 2. Fetch AI recommendation
            setLoadingAI(true);
            getAIRecommendation(data)
                .then(rec => setAiRecommendation(rec))
                .catch(err => console.error('AI recommendation failed:', err))
                .finally(() => setLoadingAI(false));

        } catch (err) {
            setError(err.message || 'Failed to fetch user data. Please check the username.');
        } finally {
            setLoading(false);
        }
    };

    const handleNewRecommendation = async () => {
        if (!userData) return;
        setLoadingAI(true);
        try {
            const rec = await getAIRecommendation(userData);
            setAiRecommendation(rec);
        } catch (err) {
            console.error('Failed to get new recommendation:', err);
        } finally {
            setLoadingAI(false);
        }
    };

    // Calculate Blind 75 progress (simplified - estimate based on total solved)
    const blind75Progress = userData ? Math.min(Math.round((userData.solved.all / 500) * 75), 75) : 0;

    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="max-w-7xl mx-auto">
                {/* Header / Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
                        <p className="text-white/60">Track your progress and analyze your performance.</p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        {/* Ghost Mode Button - The "Resume Flex" Feature */}
                        {userData && (
                            <button
                                onClick={() => navigate('/ghost-mode')}
                                className="px-4 py-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl font-bold hover:bg-red-500/30 transition-all flex items-center gap-2"
                            >
                                <Zap className="w-5 h-5" />
                                Ghost Mode
                            </button>
                        )}

                        <form onSubmit={handleSearch} className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Enter LeetCode Username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-lg hover:bg-primary/30 transition-colors disabled:opacity-50"
                            >
                                {loading ? '...' : 'SYNC'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 mb-6"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </motion.div>
                )}

                {/* Main Content Area */}
                {userData ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* Stats Overview */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <StatCard
                                    label="Total Solved"
                                    value={userData.solved.all}
                                    icon={<Trophy className="w-5 h-5 text-yellow-400" />}
                                />
                                <StatCard
                                    label="Global Rank"
                                    value={userData.ranking ? `#${userData.ranking.toLocaleString()}` : 'N/A'}
                                    icon={<Target className="w-5 h-5 text-primary" />}
                                />
                                <StatCard
                                    label="Active Days"
                                    value={userData.totalActiveDays || 0}
                                    icon={<Zap className="w-5 h-5 text-secondary" />}
                                />
                            </div>

                            {/* Difficulty Breakdown */}
                            <div className="glass-card p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-6">Difficulty Breakdown</h3>
                                <div className="space-y-4">
                                    <ProgressBar label="Easy" count={userData.solved.easy} total={800} color="bg-green-400" />
                                    <ProgressBar label="Medium" count={userData.solved.medium} total={1600} color="bg-yellow-400" />
                                    <ProgressBar label="Hard" count={userData.solved.hard} total={700} color="bg-red-400" />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar (Roadmap & AI) */}
                        <div className="space-y-8">
                            <div className="glass-card p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-4">Blind 75 Progress</h3>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white/60">{blind75Progress} / 75 Solved</span>
                                    <span className="text-sm font-bold text-primary">{Math.round((blind75Progress / 75) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-1000"
                                        style={{ width: `${(blind75Progress / 75) * 100}%` }}
                                    />
                                </div>
                                <p className="text-xs text-white/40 mt-3">
                                    Estimated based on your total problems solved
                                </p>
                            </div>

                            <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px]" />
                                <h3 className="text-xl font-bold mb-4 relative z-10">AI Recommendation</h3>

                                {loadingAI ? (
                                    <div className="text-center py-8">
                                        <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        <p className="text-sm text-white/60 mt-2">Analyzing your progress...</p>
                                    </div>
                                ) : aiRecommendation ? (
                                    <>
                                        <p className="text-sm text-white/60 mb-4 relative z-10">
                                            {aiRecommendation.reason}
                                        </p>
                                        <div className="p-3 bg-white/5 rounded-lg border border-white/10 mb-4 relative z-10">
                                            <div className="font-medium">{aiRecommendation.title}</div>
                                            <div className={`text-xs mt-1 ${aiRecommendation.difficulty === 'Easy' ? 'text-green-400' :
                                                aiRecommendation.difficulty === 'Medium' ? 'text-yellow-400' :
                                                    'text-red-400'
                                                }`}>
                                                {aiRecommendation.difficulty} • {aiRecommendation.topic}
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleNewRecommendation}
                                            className="w-full py-2 bg-primary text-black font-bold rounded-lg text-sm hover:opacity-90 transition-opacity relative z-10"
                                        >
                                            Get New Suggestion
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center py-8 text-white/40 text-sm">
                                        AI recommendation will appear here
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                            <Search className="w-8 h-8 text-white/20" />
                        </div>
                        <h3 className="text-xl font-bold text-white/40">Enter a username to start tracking</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon }) => (
    <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-xl">
            {icon}
        </div>
        <div>
            <div className="text-sm text-white/60">{label}</div>
            <div className="text-2xl font-bold font-heading">{value}</div>
        </div>
    </div>
);

const ProgressBar = ({ label, count, total, color }) => (
    <div>
        <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{label}</span>
            <span className="text-white/60">{count} / {total}</span>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <div
                className={`h-full ${color} transition-all duration-1000`}
                style={{ width: `${(count / total) * 100}%` }}
            />
        </div>
    </div>
);

export default Dashboard;
