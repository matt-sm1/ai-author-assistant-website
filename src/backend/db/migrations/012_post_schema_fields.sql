-- FAQ items (CMS) + optional manual JSON-LD for public schema graph.
ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS faq_items JSONB NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS schema_json_ld TEXT NULL;
