import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, TrendingUp, Star, Zap, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase, Tool, Category } from '../lib/supabase';
import ToolCard from '../components/ToolCard';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([]);
  const [trendingTools, setTrendingTools] = useState<Tool[]>([]);
  const [recentTools, setRecentTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, we'd fetch from Supabase.
        // For this demo, if Supabase isn't configured, we'll use mock data.
        const { data: catData } = await supabase.from('categories').select('*').limit(8);
        const { data: featData } = await supabase.from('tools').select('*, categories(*)').eq('is_featured', true).limit(8);
        const { data: trendData } = await supabase.from('tools').select('*, categories(*)').eq('is_trending', true).limit(6);
        const { data: recData } = await supabase.from('tools').select('*, categories(*)').order('created_at', { ascending: false }).limit(6);

        if (catData) setCategories(catData);
        if (featData) setFeaturedTools(featData);
        if (trendData) setTrendingTools(trendData);
        if (recData) setRecentTools(recData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900/0.2),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Discover the Best <span className="text-primary">AI Tools</span> <br /> in One Place
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              Explore 500+ AI tools across every category. Find the right tool for your workflow and boost your productivity.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                <input
                  type="text"
                  placeholder="Search for tools, categories, or use cases..."
                  className="w-full pl-12 pr-32 py-5 rounded-2xl glass shadow-xl focus:ring-2 focus:ring-primary focus:outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tools" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                Explore Tools
              </Link>
              <Link to="/submit" className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                Submit a Tool
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="text-amber-400" fill="currentColor" /> Featured Tools
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Hand-picked AI tools that we highly recommend.</p>
          </div>
          <Link to="/tools?filter=featured" className="text-primary font-semibold flex items-center gap-1 hover:underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <LayoutGrid className="text-primary" /> Browse by Category
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Find tools organized by their primary function.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center card-hover group"
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{cat.tool_count} tools</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="text-orange-500" /> Trending Tools
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">The most popular AI tools right now.</p>
          </div>
          <Link to="/tools?sort=trending" className="text-primary font-semibold flex items-center gap-1 hover:underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="text-primary" /> Recently Added
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">The latest additions to our directory.</p>
          </div>
          <Link to="/tools?sort=newest" className="text-primary font-semibold flex items-center gap-1 hover:underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Stay Updated with the Latest AI Tools</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto relative z-10">
            Join 10,000+ AI enthusiasts and get a weekly roundup of the best new AI tools, tips, and guides.
          </p>

          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:bg-white/20 transition-all"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-indigo-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
