import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/logo.png';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const res = await signup(formData.name, formData.email, formData.password);
    if (res.success) {
      navigate('/');
    } else {
      setErrorMsg(res.error || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-zinc-100 bg-background">
      {/* Left side - Branding/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-accent/20 via-background to-primary/20 border-r border-white/5 items-center justify-center p-12 overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg"
        >
          <div className="flex items-center gap-4 mb-8">
            <img src={logoImage} alt="ContentCraft" className="w-16 h-16 rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.5)]" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              ContentCraft
            </h1>
          </div>
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Start building your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Audience</span>.
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Get instant access to real-time algorithm insights, viral hook generators, and AI-driven growth frameworks today.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-4 rounded-xl border border-white/10">
              <h3 className="text-accent font-bold text-lg">Instant Trends</h3>
              <p className="text-sm text-zinc-400">Real-time algorithmic data.</p>
            </div>
            <div className="glass p-4 rounded-xl border border-white/10">
              <h3 className="text-primary font-bold text-lg">AI Automation</h3>
              <p className="text-sm text-zinc-400">10x your content workflow.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create an account</h2>
            <p className="text-zinc-400">Launch your content strategy in seconds.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            {errorMsg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
                {errorMsg}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="you@startup.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Min. 6 characters"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-accent to-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Complete Signup <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-accent hover:text-primary transition-colors">
              Sign in securely
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
