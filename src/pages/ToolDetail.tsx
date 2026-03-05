import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  ChevronRight,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle2,
  Calendar,
  Tag,
  ArrowLeft
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase, Tool } from '../lib/supabase';
import { formatDate, cn } from '../lib/utils';
import { toast } from 'react-toastify';

const ToolDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTool = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('tools')
          .select('*, categories(*)')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          navigate('/404');
          return;
        }

        setTool(data);

        // Increment visit count
        await supabase.rpc('increment_visit_count', { tool_id: data.id });
      } catch (error) {
        console.error('Error fetching tool:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchTool();
  }, [slug, navigate]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out ${tool?.name} on Digital Hub AI!`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-24 w-24 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!tool) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} />
        <Link to="/tools" className="hover:text-primary">Tools</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${tool.category?.slug}`} className="hover:text-primary">{tool.category?.name}</Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white font-medium">{tool.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 flex-shrink-0 shadow-lg">
              <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Link
                  to={`/category/${tool.category?.slug}`}
                  className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs font-bold"
                >
                  {tool.category?.name}
                </Link>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold",
                  tool.pricing === 'Free' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  tool.pricing === 'Freemium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                )}>
                  {tool.pricing}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{tool.name}</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {tool.short_description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm">
                <Tag size={14} /> {tag}
              </span>
            ))}
          </div>

          {/* Long Description */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">About {tool.name}</h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <ReactMarkdown>{tool.long_description}</ReactMarkdown>
            </div>
          </div>

          {/* Features */}
          {tool.features && tool.features.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots */}
          {tool.screenshots && tool.screenshots.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
              <div className="space-y-6">
                {tool.screenshots.map((url, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                    <img src={url} alt={`${tool.name} screenshot ${i + 1}`} className="w-full h-auto" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 sticky top-24 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <a
              href={tool.affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mb-8"
            >
              Visit Website <ExternalLink size={20} />
            </a>

            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Pricing</span>
                <span className="font-bold">{tool.pricing}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Category</span>
                <Link to={`/category/${tool.category?.slug}`} className="font-bold text-primary hover:underline">
                  {tool.category?.name}
                </Link>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Added on</span>
                <span className="font-bold flex items-center gap-2">
                  <Calendar size={14} /> {formatDate(tool.created_at)}
                </span>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Share2 size={16} /> Share this tool
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                >
                  <Twitter size={20} />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                >
                  <Linkedin size={20} />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
