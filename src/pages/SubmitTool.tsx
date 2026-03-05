import React, { useState, useEffect } from 'react';
import { supabase, Category } from '../lib/supabase';
import { toast } from 'react-toastify';
import { Send, CheckCircle2 } from 'lucide-react';

const SubmitTool = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tool_name: '',
    website_url: '',
    category: '',
    description: '',
    submitter_email: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('submitted_tools').insert([
        { ...formData, status: 'pending' }
      ]);

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Thank you! We'll review your submission.");
    } catch (error) {
      console.error('Error submitting tool:', error);
      toast.error('Failed to submit tool. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Submission Received!</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Thank you for submitting your tool. Our team will review it and get back to you soon.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Submit Another Tool
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Submit a Tool</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Have an amazing AI tool? Share it with our community.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Tool Name *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. ChatGPT"
                value={formData.tool_name}
                onChange={(e) => setFormData({ ...formData, tool_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Website URL *</label>
              <input
                type="url"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="https://example.com"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Category *</label>
            <select
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Short Description *</label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="A brief summary of what the tool does..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Your Email *</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="you@example.com"
              value={formData.submitter_email}
              onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting...' : (
              <>
                Submit Tool <Send size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTool;
