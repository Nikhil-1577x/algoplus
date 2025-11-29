import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Clock, Zap, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitBattleRun } from '../services/api';
import { fetchUserProfile } from '../services/leetcode';

// Mock Ghost Data (until we have real runs in DB)
const GHOST_DATA = {
    username: "neal_wu",
    time: 185, // 3m 05s
    avatar: "https://assets.leetcode.com/users/neal_wu/avatar_1660687799.png"
};

const GhostMode = () => {
    const navigate = useNavigate();
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [code, setCode] = useState('// Write your solution here...');
    const [status, setStatus] = useState('idle'); // idle, running, verifying, victory, defeat
    const [ghostProgress, setGhostProgress] = useState(0);

    // Start the battle on mount
    useEffect(() => {
        setIsRunning(true);
    }, []);

    // Timer & Ghost Logic
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);

                // Update Ghost Progress
                const progress = Math.min((elapsedTime / GHOST_DATA.time) * 100, 100);
                setGhostProgress(progress);

                // Check if Ghost won
                if (elapsedTime >= GHOST_DATA.time && status !== 'defeat') {
                    // setStatus('defeat'); // Optional: Don't auto-fail, just show they were slower
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, elapsedTime, status]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmit = async () => {
        setIsRunning(false);
        setStatus('verifying');

        // Simulate verification (In real app, check LeetCode API)
        setTimeout(async () => {
            const isWin = elapsedTime < GHOST_DATA.time;
            setStatus(isWin ? 'victory' : 'defeat');

            // Save run to backend
            try {
                await submitBattleRun({
                    userId: "placeholder_id", // We need real auth for this
                    username: "You",
                    problemSlug: "two-sum",
                    problemTitle: "Two Sum",
                    timeTakenSeconds: elapsedTime,
                    codeLanguage: "javascript"
                });
            } catch (err) {
                console.error("Failed to save run", err);
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen pt-20 px-6 pb-6 flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-white/60 hover:text-white">
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-mono text-xl font-bold">{formatTime(elapsedTime)}</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors flex items-center gap-2"
                >
                    <CheckCircle className="w-5 h-5" /> Submit
                </button>
            </div>

            {/* Main Arena */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                {/* Left: Problem & Ghost */}
                <div className="space-y-6 overflow-y-auto pr-2">
                    {/* Ghost Status */}
                    <div className="glass-card p-4 rounded-xl border-red-500/20 bg-red-500/5">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-red-400" />
                                <span className="font-bold text-red-400">Opponent: {GHOST_DATA.username}</span>
                            </div>
                            <span className="text-xs text-white/60">Target: {formatTime(GHOST_DATA.time)}</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-red-500 transition-all duration-1000 ease-linear"
                                style={{ width: `${ghostProgress}%` }}
                            />
                        </div>
                    </div>

                    {/* Problem Description */}
                    <div className="glass-card p-6 rounded-xl">
                        <h2 className="text-2xl font-bold mb-4">1. Two Sum</h2>
                        <div className="prose prose-invert max-w-none">
                            <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
                            <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
                            <p>You can return the answer in any order.</p>

                            <h3 className="text-lg font-bold mt-4">Example 1:</h3>
                            <pre className="bg-black/30 p-3 rounded-lg mt-2">
                                Input: nums = [2,7,11,15], target = 9{'\n'}
                                Output: [0,1]{'\n'}
                                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Right: Code Editor */}
                <div className="glass-card rounded-xl overflow-hidden border border-white/10 flex flex-col">
                    <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
                        <span className="text-sm font-mono text-white/60">solution.js</span>
                        <span className="text-xs text-white/40">Auto-saved</span>
                    </div>
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        theme="vs-dark"
                        value={code}
                        onChange={setCode}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 20 },
                            fontFamily: "'JetBrains Mono', monospace",
                            scrollBeyondLastLine: false,
                        }}
                    />
                </div>
            </div>

            {/* Result Overlay */}
            {status === 'victory' && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="bg-[#0a0a0a] border border-green-500/30 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl shadow-green-500/20"
                    >
                        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">VICTORY!</h2>
                        <p className="text-white/60 mb-6">You defeated {GHOST_DATA.username}!</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-white/5 rounded-xl">
                                <div className="text-sm text-white/40">Your Time</div>
                                <div className="text-2xl font-bold text-green-400">{formatTime(elapsedTime)}</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl">
                                <div className="text-sm text-white/40">Ghost Time</div>
                                <div className="text-2xl font-bold text-red-400">{formatTime(GHOST_DATA.time)}</div>
                            </div>
                        </div>

                        <button onClick={() => navigate('/dashboard')} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200">
                            Back to Dashboard
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

// Helper Icon
const Trophy = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
);

export default GhostMode;
