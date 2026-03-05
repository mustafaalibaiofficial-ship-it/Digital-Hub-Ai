import React from 'react';
import { Mail } from 'lucide-react';

const Blog = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Blog</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Coming Soon — AI Tools Tips, Guides, and Industry Insights.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Get Notified When We Launch</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Be the first to know when we publish our first guide. No spam, ever.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-colors"
          >
            Notify Me
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
