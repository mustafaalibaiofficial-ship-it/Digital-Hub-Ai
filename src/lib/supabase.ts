import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Lazy initialization to prevent crashing when keys are missing
let _supabase: any = null;

const DEMO_CATEGORIES = [
  { id: '1', name: 'AI Chatbots', slug: 'ai-chatbots', icon: '💬', tool_count: 124 },
  { id: '2', name: 'AI Image Generators', slug: 'ai-image-generators', icon: '🎨', tool_count: 86 },
  { id: '3', name: 'AI Video Tools', slug: 'ai-video-tools', icon: '🎬', tool_count: 42 },
  { id: '4', name: 'AI Voice Generators', slug: 'ai-voice-generators', icon: '🎙️', tool_count: 35 },
  { id: '5', name: 'AI Writing Tools', slug: 'ai-writing-tools', icon: '✍️', tool_count: 98 },
  { id: '6', name: 'AI Coding Tools', slug: 'ai-coding-tools', icon: '💻', tool_count: 24 },
  { id: '7', name: 'AI Productivity Tools', slug: 'ai-productivity-tools', icon: '⚡', tool_count: 156 },
  { id: '8', name: 'AI Marketing Tools', slug: 'ai-marketing-tools', icon: '📈', tool_count: 67 },
];

const DEMO_TOOLS = [
  {
    id: 't1',
    name: 'ChatGPT',
    slug: 'chatgpt',
    short_description: 'The world\'s most popular AI chatbot for conversation, coding, and more.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    pricing: 'Freemium',
    is_featured: true,
    is_trending: true,
    visit_count: 15420,
    category: DEMO_CATEGORIES[0],
    affiliate_link: 'https://chat.openai.com',
    tags: ['Chat', 'Assistant'],
    created_at: new Date().toISOString()
  },
  {
    id: 't2',
    name: 'Midjourney',
    slug: 'midjourney',
    short_description: 'High-quality AI image generation with incredible artistic detail.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    pricing: 'Paid',
    is_featured: true,
    is_trending: true,
    visit_count: 12300,
    category: DEMO_CATEGORIES[1],
    affiliate_link: 'https://www.midjourney.com',
    tags: ['Art', 'Design'],
    created_at: new Date().toISOString()
  },
  {
    id: 't3',
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    short_description: 'The most realistic AI voice generator and text-to-speech tool.',
    logo_url: 'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1674474744/v8p8p8p8p8p8p8p8p8p8.png',
    pricing: 'Freemium',
    is_featured: true,
    is_trending: false,
    visit_count: 8900,
    category: DEMO_CATEGORIES[3],
    affiliate_link: 'https://elevenlabs.io',
    tags: ['Voice', 'Audio'],
    created_at: new Date().toISOString()
  },
  {
    id: 't4',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    short_description: 'Your AI pair programmer that helps you write code faster.',
    logo_url: 'https://github.githubassets.com/images/modules/site/copilot/copilot-logo.png',
    pricing: 'Paid',
    is_featured: true,
    is_trending: true,
    visit_count: 11000,
    category: DEMO_CATEGORIES[5],
    affiliate_link: 'https://github.com/features/copilot',
    tags: ['Coding', 'DevTools'],
    created_at: new Date().toISOString()
  },
  {
    id: 't5',
    name: 'Claude 3',
    slug: 'claude-3',
    short_description: 'Anthropic\'s latest AI model with advanced reasoning and safety.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Anthropic_logo.svg',
    pricing: 'Freemium',
    is_featured: false,
    is_trending: true,
    visit_count: 9500,
    category: DEMO_CATEGORIES[0],
    affiliate_link: 'https://claude.ai',
    tags: ['Chat', 'Research'],
    created_at: new Date().toISOString()
  },
  {
    id: 't6',
    name: 'Runway Gen-3',
    slug: 'runway',
    short_description: 'Next-generation AI video generation from text or images.',
    logo_url: 'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1614115454/v8p8p8p8p8p8p8p8p8p8.png',
    pricing: 'Paid',
    is_featured: true,
    is_trending: true,
    visit_count: 7600,
    category: DEMO_CATEGORIES[2],
    affiliate_link: 'https://runwayml.com',
    tags: ['Video', 'Creative'],
    created_at: new Date().toISOString()
  }
];

const createMockSupabase = () => {
  const mockQuery = {
    select: (columns: string) => {
      // Basic detection of what table we are querying
      return mockQuery;
    },
    eq: (col: string, val: any) => mockQuery,
    single: () => Promise.resolve({ data: DEMO_TOOLS[0], error: null }),
    limit: (n: number) => mockQuery,
    order: () => mockQuery,
    range: () => mockQuery,
    or: () => mockQuery,
    insert: () => Promise.resolve({ data: null, error: null }),
    upsert: () => Promise.resolve({ data: null, error: null }),
    // This is the key: when the query is "awaited" or .then() is called
    then: (resolve: any) => {
      // We need to figure out which data to return based on the context
      // For simplicity in this mock, we'll return tools or categories
      // We'll check the internal state or just return a mix
      resolve({ data: DEMO_TOOLS, error: null });
    },
  };

  return {
    from: (table: string) => {
      const query = { ...mockQuery };
      query.then = (resolve: any) => {
        if (table === 'categories') {
          resolve({ data: DEMO_CATEGORIES, error: null });
        } else if (table === 'tools') {
          resolve({ data: DEMO_TOOLS, error: null });
        } else {
          resolve({ data: [], error: null });
        }
      };
      return query;
    },
    auth: {
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
    rpc: () => Promise.resolve({ data: null, error: null }),
  };
};

export const supabase = new Proxy({} as any, {
  get(target, prop) {
    if (!_supabase) {
      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase credentials missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
        const mock = createMockSupabase();
        return (mock as any)[prop];
      }
      _supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
    
    const value = _supabase[prop];
    return typeof value === 'function' ? value.bind(_supabase) : value;
  }
});

// Types for our database
export type PricingType = 'Free' | 'Freemium' | 'Paid';

export interface Tool {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  logo_url: string;
  category_id: string;
  pricing: PricingType;
  affiliate_link: string;
  tags: string[];
  features: string[];
  screenshots: string[];
  is_featured: boolean;
  is_trending: boolean;
  is_sponsored: boolean;
  visit_count: number;
  created_at: string;
  updated_at: string;
  seo_title: string;
  seo_description: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  tool_count: number;
  created_at: string;
}

export interface SubmittedTool {
  id: string;
  tool_name: string;
  website_url: string;
  category: string;
  description: string;
  submitter_email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}
