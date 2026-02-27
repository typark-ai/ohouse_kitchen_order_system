
-- Create storage bucket for case files
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-files', 'case-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read files from the bucket (public)
CREATE POLICY "Public read access on case-files"
ON storage.objects FOR SELECT
USING (bucket_id = 'case-files');

-- Allow anyone to upload files to the bucket
CREATE POLICY "Allow uploads to case-files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'case-files');

-- Allow anyone to delete their own files
CREATE POLICY "Allow deletes from case-files"
ON storage.objects FOR DELETE
USING (bucket_id = 'case-files');
