import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { name: 'AI Chatbots', slug: 'ai-chatbots', icon: '💬', description: 'Conversational AI assistants for various tasks.' },
  { name: 'AI Image Generators', slug: 'ai-image-generators', icon: '🎨', description: 'Tools to create stunning images from text prompts.' },
  { name: 'AI Video Tools', slug: 'ai-video-tools', icon: '🎬', description: 'Create and edit videos using artificial intelligence.' },
  { name: 'AI Voice Generators', slug: 'ai-voice-generators', icon: '🎙️', description: 'Convert text to realistic speech and clone voices.' },
  { name: 'AI Writing Tools', slug: 'ai-writing-tools', icon: '✍️', description: 'Assistants for content creation, copywriting, and editing.' },
  { name: 'AI Coding Tools', slug: 'ai-coding-tools', icon: '💻', description: 'Tools to help developers write and debug code faster.' },
  { name: 'AI Productivity Tools', slug: 'ai-productivity-tools', icon: '⚡', description: 'Boost your daily workflow with AI-powered utilities.' },
  { name: 'AI Marketing Tools', slug: 'ai-marketing-tools', icon: '📈', description: 'Optimize your marketing campaigns and social media.' },
];

const tools = [
  {
    name: 'ChatGPT',
    slug: 'chatgpt',
    short_description: 'The most popular AI chatbot by OpenAI.',
    long_description: 'ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a prompt and provide a detailed response. We are trained to follow instructions in a prompt and provide a detailed response.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    pricing: 'Freemium',
    affiliate_link: 'https://chat.openai.com',
    tags: ['Chat', 'Assistant', 'OpenAI'],
    features: ['Natural language understanding', 'Code generation', 'Creative writing'],
    is_featured: true,
    is_trending: true,
    seo_title: 'ChatGPT - The Best AI Chatbot',
    seo_description: 'Experience the power of OpenAI\'s ChatGPT for all your conversational needs.'
  },
  {
    name: 'Midjourney',
    slug: 'midjourney',
    short_description: 'High-quality AI image generation via Discord.',
    long_description: 'Midjourney is an independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    pricing: 'Paid',
    affiliate_link: 'https://www.midjourney.com',
    tags: ['Image', 'Art', 'Generative'],
    features: ['High-resolution images', 'Unique artistic styles', 'Discord integration'],
    is_featured: true,
    is_trending: true,
    seo_title: 'Midjourney - AI Art Generator',
    seo_description: 'Create stunning AI art with Midjourney\'s powerful image generation tools.'
  },
  // Add more tools here...
];

async function seed() {
  console.log('Seeding categories...');
  const { data: catData, error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' }).select();
  if (catError) {
    console.error('Error seeding categories:', catError);
    return;
  }
  console.log('Categories seeded successfully');

  const categoryMap = new Map(catData.map(c => [c.slug, c.id]));

  console.log('Seeding tools...');
  const toolsToInsert = tools.map(t => {
    // Randomly assign a category for demo
    const catId = catData[Math.floor(Math.random() * catData.length)].id;
    return { ...t, category_id: catId };
  });

  const { error: toolError } = await supabase.from('tools').upsert(toolsToInsert, { onConflict: 'slug' });
  if (toolError) {
    console.error('Error seeding tools:', toolError);
    return;
  }
  console.log('Tools seeded successfully');
}

seed();
