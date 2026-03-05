import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp, Star } from 'lucide-react';
import { Tool } from '../lib/supabase';
import { cn } from '../lib/utils';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const pricingColors = {
    Free: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Freemium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Paid: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 card-hover flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
          <img
            src={tool.logo_url}
            alt={tool.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex gap-2">
          {tool.is_featured && (
            <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg dark:bg-indigo-900/30 dark:text-indigo-400" title="Featured">
              <Star size={16} fill="currentColor" />
            </span>
          )}
          {tool.is_trending && (
            <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg dark:bg-orange-900/30 dark:text-orange-400" title="Trending">
              <TrendingUp size={16} />
            </span>
          )}
        </div>
      </div>

      <Link to={`/tools/${tool.slug}`} className="block">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-1">
          {tool.name}
        </h3>
      </Link>

      <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
        {tool.short_description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {tool.category?.name || 'AI Tool'}
        </span>
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", pricingColors[tool.pricing])}>
          {tool.pricing}
        </span>
      </div>

      <div className="flex gap-3 mt-auto">
        <Link
          to={`/tools/${tool.slug}`}
          className="flex-1 py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold text-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          Details
        </Link>
        <a
          href={tool.affiliate_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-4 rounded-xl bg-primary text-white text-sm font-semibold text-center hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          Visit <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default ToolCard;
