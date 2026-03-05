import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { supabase, Tool, Category, PricingType } from '../lib/supabase';
import ToolCard from '../components/ToolCard';
import { cn } from '../lib/utils';

const ToolsListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const query = searchParams.get('q') || '';
  const categorySlug = searchParams.get('category') || '';
  const pricing = searchParams.get('pricing') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12;

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      try {
        let supabaseQuery = supabase
          .from('tools')
          .select('*, categories(*)', { count: 'exact' });

        if (query) {
          supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,short_description.ilike.%${query}%`);
        }

        if (categorySlug) {
          const cat = categories.find(c => c.slug === categorySlug);
          if (cat) {
            supabaseQuery = supabaseQuery.eq('category_id', cat.id);
          }
        }

        if (pricing) {
          supabaseQuery = supabaseQuery.eq('pricing', pricing);
        }

        // Sorting
        if (sort === 'newest') {
          supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
        } else if (sort === 'trending') {
          supabaseQuery = supabaseQuery.order('is_trending', { ascending: false }).order('visit_count', { ascending: false });
        } else if (sort === 'visited') {
          supabaseQuery = supabaseQuery.order('visit_count', { ascending: false });
        }

        // Pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        supabaseQuery = supabaseQuery.range(from, to);

        const { data, count } = await supabaseQuery;
        if (data) setTools(data);
        if (count !== null) setTotalCount(count);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [query, categorySlug, pricing, sort, page, categories]);

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to first page on filter change
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">All AI Tools</h1>
        <p className="text-slate-600 dark:text-slate-400">Discover and compare the best AI tools for your needs.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold mb-6">
              <Filter size={18} className="text-primary" /> Filters
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Category</label>
                <select
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary text-sm"
                  value={categorySlug}
                  onChange={(e) => updateParam('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Pricing</label>
                <div className="space-y-2">
                  {['Free', 'Freemium', 'Paid'].map((p) => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="pricing"
                        checked={pricing === p}
                        onChange={() => updateParam('pricing', p)}
                        className="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">{p}</span>
                    </label>
                  ))}
                  {pricing && (
                    <button
                      onClick={() => updateParam('pricing', '')}
                      className="text-xs text-primary hover:underline mt-2"
                    >
                      Clear pricing
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                value={query}
                onChange={(e) => updateParam('q', e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
              <select
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-primary"
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="trending">Trending</option>
                <option value="visited">Most Visited</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900 dark:text-white">{tools.length}</span> of <span className="font-bold text-slate-900 dark:text-white">{totalCount}</span> tools
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <Search size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">No tools found</h3>
              <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={() => setSearchParams({})}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalCount > limit && (
            <div className="mt-12 flex justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => updateParam('page', (page - 1).toString())}
                className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">Page {page} of {Math.ceil(totalCount / limit)}</span>
              <button
                disabled={page >= Math.ceil(totalCount / limit)}
                onClick={() => updateParam('page', (page + 1).toString())}
                className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsListing;
