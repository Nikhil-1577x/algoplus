import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Menu, X, Github, Twitter } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDashboard = location.pathname === '/dashboard' || location.pathname === '/ghost-mode';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isDashboard ? 'bg-background/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/30 transition-all" />
                            <div className="relative p-2.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-primary/30 group-hover:border-primary/50 transition-all">
                                <Code2 className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold font-heading tracking-tight leading-none">
                                Algo<span className="text-gradient">plus</span>
                            </span>
                            <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase">LeetCode Tracker</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        <a href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Features</a>
                        <a href="#ghost-mode" className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-2">
                            Ghost Mode
                            <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded uppercase leading-none">Hot</span>
                        </a>
                        <a href="https://github.com/Nikhil-1577x" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/60 hover:text-white transition-colors">GitHub</a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/dashboard"
                            className="px-5 py-2 text-white/80 hover:text-white text-sm font-semibold transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/dashboard"
                            className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-glow text-black text-sm font-bold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                        >
                            Get Started Free
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white/60 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-white/10 p-6 space-y-4"
                >
                    <a href="#features" className="block text-white/60 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#ghost-mode" className="block text-white/60 hover:text-white flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                        Ghost Mode
                        <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded uppercase">Hot</span>
                    </a>
                    <a href="https://github.com/Nikhil-1577x" target="_blank" rel="noopener noreferrer" className="block text-white/60 hover:text-white">GitHub</a>
                    <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                        <Link to="/dashboard" className="w-full py-3 text-center border border-white/10 rounded-lg font-semibold hover:bg-white/5">
                            Sign In
                        </Link>
                        <Link to="/dashboard" className="w-full py-3 text-center bg-gradient-to-r from-primary to-primary-glow text-black rounded-lg font-bold">
                            Get Started Free
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
