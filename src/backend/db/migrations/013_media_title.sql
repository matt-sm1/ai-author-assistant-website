-- Optional display title for media library items (separate from filename).

ALTER TABLE media
ADD COLUMN IF NOT EXISTS title TEXT;