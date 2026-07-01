-- サイトのコンテンツを保存するテーブル。
-- Supabase ダッシュボードの SQL Editor で一度実行してください。
create table if not exists public.site_content (
  id         integer primary key,
  data       jsonb not null,
  updated_at timestamptz default now()
);

-- サーバー側から service_role キーでのみアクセスするため RLS を有効化する。
-- （service_role は RLS をバイパスするため、公開用のポリシーは作成しない。）
alter table public.site_content enable row level security;
