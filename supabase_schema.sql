-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text,
  description text,
  tool_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Create tools table
CREATE TABLE tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text,
  long_description text,
  logo_url text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  pricing text CHECK (pricing IN ('Free', 'Freemium', 'Paid')),
  affiliate_link text,
  tags text[],
  features text[],
  screenshots text[],
  is_featured boolean DEFAULT false,
  is_trending boolean DEFAULT false,
  is_sponsored boolean DEFAULT false,
  visit_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  seo_title text,
  seo_description text
);

-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create submitted_tools table
CREATE TABLE submitted_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_name text,
  website_url text,
  category text,
  description text,
  submitter_email text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE submitted_tools ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access to categories and tools
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to tools" ON tools FOR SELECT USING (true);

-- Allow public insert to newsletter_subscribers and submitted_tools
CREATE POLICY "Allow public insert to newsletter_subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to submitted_tools" ON submitted_tools FOR INSERT WITH CHECK (true);

-- Admin policies (assuming admin role or specific email)
-- For simplicity in this demo, we'll allow all operations for now if you have the service role key
-- In production, you'd restrict this to authenticated admins

-- Function to increment visit count
CREATE OR REPLACE FUNCTION increment_visit_count(tool_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE tools
  SET visit_count = visit_count + 1
  WHERE id = tool_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
