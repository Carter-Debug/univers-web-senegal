-- Create storage bucket for founder profile photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('founder-photos', 'founder-photos', true);

-- Create founder profile table
CREATE TABLE public.founder_profile (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  title text NOT NULL,
  bio text,
  photo_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.founder_profile ENABLE ROW LEVEL SECURITY;

-- Public can view founder profile
CREATE POLICY "Anyone can view founder profile"
ON public.founder_profile
FOR SELECT
USING (true);

-- Admins can manage founder profile
CREATE POLICY "Admins can manage founder profile"
ON public.founder_profile
FOR ALL
USING (EXISTS (
  SELECT 1 FROM admin_profiles
  WHERE admin_profiles.user_id = auth.uid()
));

-- Storage policies for founder photos
CREATE POLICY "Anyone can view founder photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'founder-photos');

CREATE POLICY "Admins can upload founder photos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'founder-photos' 
  AND EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE admin_profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update founder photos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'founder-photos'
  AND EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE admin_profiles.user_id = auth.uid()
  )
);

-- Insert default founder profile
INSERT INTO public.founder_profile (full_name, title, bio)
VALUES (
  'Nom du Fondateur',
  'Fondateur d''Univers Web SA Consulting',
  'Développeur web et entrepreneur passionné par la création de solutions digitales innovantes pour les entreprises sénégalaises.'
);