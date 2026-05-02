-- 与《技术文档》第四节对齐的 v0 骨架（可按迁移工具演进）

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  login TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Asia/Shanghai',
  role TEXT NOT NULL DEFAULT 'normal' CHECK (role IN ('normal', 'developer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE vocabulary_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  lemma TEXT NOT NULL,
  raw_input TEXT NOT NULL,
  definition_json JSONB,
  mastery_score NUMERIC(10, 2) DEFAULT 0,
  mastery_level SMALLINT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_vocabulary_user_lemma_lower ON vocabulary_items (user_id, (lower(lemma)));

CREATE TABLE checkin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  client_meta JSONB,
  CONSTRAINT chk_ended CHECK (ended_at IS NULL OR ended_at >= started_at)
);

CREATE INDEX idx_checkin_sessions_user_started ON checkin_sessions (user_id, started_at DESC);

CREATE TABLE daily_checkins (
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  local_date DATE NOT NULL,
  total_seconds INT NOT NULL DEFAULT 0,
  completed_session_count INT NOT NULL DEFAULT 0,
  checked_in BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, local_date)
);

CREATE TABLE mastery_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  vocabulary_item_id UUID REFERENCES vocabulary_items (id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  delta INT NOT NULL DEFAULT 0,
  local_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_mastery_events_user_date ON mastery_events (user_id, local_date);

CREATE TABLE corpus_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  title TEXT,
  published_at TIMESTAMPTZ,
  url TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  license_tier TEXT NOT NULL DEFAULT 'api',
  raw_metadata JSONB,
  UNIQUE (source, external_id)
);

CREATE TABLE corpus_sentences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES corpus_articles (id) ON DELETE CASCADE,
  text TEXT NOT NULL
);

CREATE INDEX idx_corpus_sentences_article ON corpus_sentences (article_id);
