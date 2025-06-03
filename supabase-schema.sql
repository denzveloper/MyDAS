-- =============================================
-- MIDAS Marketing Agency Database Schema
-- =============================================

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- =============================================
-- 1. CONTACTS TABLE
-- Untuk menyimpan data kontak dari form
-- =============================================
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Policy untuk insert (semua orang bisa mengirim kontak)
CREATE POLICY "Anyone can insert contacts" ON public.contacts
    FOR INSERT WITH CHECK (true);

-- Policy untuk select (hanya admin yang bisa melihat)
CREATE POLICY "Only authenticated users can view contacts" ON public.contacts
    FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================
-- 2. PROJECTS TABLE
-- Untuk menyimpan portfolio/case studies
-- =============================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    client_name VARCHAR(255),
    industry VARCHAR(100),
    project_type VARCHAR(100),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    featured BOOLEAN DEFAULT false,
    image_url TEXT,
    gallery_urls TEXT[], -- Array of image URLs
    results JSONB, -- Store metrics and results
    technologies TEXT[], -- Array of technologies used
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_industry ON public.projects(industry);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy untuk select (semua orang bisa melihat project yang published)
CREATE POLICY "Anyone can view published projects" ON public.projects
    FOR SELECT USING (status = 'published');

-- Policy untuk insert/update (hanya authenticated users)
CREATE POLICY "Only authenticated users can modify projects" ON public.projects
    FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 3. SERVICES TABLE
-- Untuk menyimpan daftar layanan
-- =============================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    icon VARCHAR(100), -- Icon name for UI
    category VARCHAR(100),
    price_range VARCHAR(100),
    features TEXT[], -- Array of features
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON public.services(sort_order);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Policy untuk select (semua orang bisa melihat service yang aktif)
CREATE POLICY "Anyone can view active services" ON public.services
    FOR SELECT USING (is_active = true);

-- =============================================
-- 4. BLOG_POSTS TABLE
-- Untuk blog/artikel
-- =============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_name VARCHAR(255),
    author_email VARCHAR(255),
    category VARCHAR(100),
    tags TEXT[], -- Array of tags
    status VARCHAR(50) DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy untuk select (semua orang bisa melihat post yang published)
CREATE POLICY "Anyone can view published posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

-- =============================================
-- 5. TESTIMONIALS TABLE
-- Untuk testimoni klien
-- =============================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_position VARCHAR(255),
    client_company VARCHAR(255),
    client_avatar TEXT,
    testimonial TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_id UUID REFERENCES public.projects(id),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON public.testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON public.testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON public.testimonials(rating);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policy untuk select (semua orang bisa melihat testimonial yang aktif)
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
    FOR SELECT USING (is_active = true);

-- =============================================
-- 6. NEWSLETTER_SUBSCRIBERS TABLE
-- Untuk subscriber newsletter
-- =============================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source VARCHAR(100) -- Where they subscribed from
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON public.newsletter_subscribers(status);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy untuk insert (semua orang bisa subscribe)
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function untuk update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers untuk semua tabel
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SAMPLE DATA (Optional)
-- =============================================

-- Insert sample services
INSERT INTO public.services (name, description, short_description, icon, category, features) VALUES
('Digital Marketing Strategy', 'Comprehensive digital marketing strategy development', 'Strategic planning for your digital presence', 'strategy', 'Strategy', ARRAY['Market Analysis', 'Competitor Research', 'Goal Setting', 'KPI Definition']),
('Social Media Management', 'Complete social media management and content creation', 'Manage your social media presence', 'social', 'Social Media', ARRAY['Content Creation', 'Community Management', 'Analytics', 'Paid Advertising']),
('SEO Optimization', 'Search engine optimization to improve your visibility', 'Boost your search engine rankings', 'search', 'SEO', ARRAY['Keyword Research', 'On-page SEO', 'Technical SEO', 'Link Building']),
('Content Marketing', 'Strategic content creation and distribution', 'Engage your audience with quality content', 'content', 'Content', ARRAY['Blog Writing', 'Video Production', 'Infographics', 'Email Marketing']);

-- Insert sample testimonial
INSERT INTO public.testimonials (client_name, client_position, client_company, testimonial, rating, is_featured) VALUES
('John Doe', 'CEO', 'Tech Startup Inc', 'MIDAS helped us increase our online presence by 300% in just 6 months. Their strategic approach and execution are outstanding!', 5, true);

COMMIT; 