# Sample Homepage (Next.js)

元の `index.html` を Next.js（App Router）に移植したプロジェクトです。

## セットアップ

**前提：Node.js のインストールが必要です**（現在この環境には未インストール）。

1. Node.js LTS をインストール: https://nodejs.org/ja
   （インストール後、PowerShell を開き直してください）
2. 依存パッケージをインストール:
   ```powershell
   npm install
   ```
3. 開発サーバーを起動:
   ```powershell
   npm run dev
   ```
4. ブラウザで http://localhost:3000 を開く

## ビルド（本番用）

```powershell
npm run build
npm run start
```

## 構成

```
.
├── app/
│   ├── globals.css     # 全体スタイル（元HTMLの<style>を移植）
│   ├── layout.js       # ルートレイアウト・メタデータ
│   └── page.js         # トップページ（各セクションを組み立て）
├── components/
│   ├── Header.js
│   ├── Hero.js
│   ├── Services.js     # サービスカードは配列で管理
│   ├── About.js        # 実績数値は配列で管理
│   ├── CTA.js
│   └── Footer.js
├── package.json
├── next.config.mjs
└── jsconfig.json       # "@/..." エイリアス設定
```

## 管理画面 & Supabase

トップページの内容は管理画面（`/admin`）から編集でき、**Supabase** に保存されます。

### セットアップ手順

1. **環境変数を設定**：`.env.local` に接続情報を入力
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=（Project Settings → API の service_role キー）
   ADMIN_PASSWORD=（管理画面のログインパスワード）
   ADMIN_SESSION_SECRET=（長いランダム文字列）
   ```
   ※ `.env.example` が雛形です。

2. **テーブルを作成**：Supabase ダッシュボード → SQL Editor で `supabase/schema.sql` を実行

3. **開発サーバーを再起動**（環境変数の反映のため）
   ```powershell
   npm run dev
   ```

4. `/admin` にアクセス → ログイン → 編集・保存
   （初回アクセス時、`data/content.json` の内容が Supabase に自動投入されます）

### データ構造

`site_content` テーブルの 1 行（`id = 1`）に、全設定を JSONB（`data` カラム）として保存します。項目を増やしてもスキーマ変更は不要です。

## 補足

- 配色は `app/globals.css` 先頭の `:root` 変数で一括変更できます。
- Supabase 接続は**サーバー側のみ**（`service_role` キーはクライアントに露出しません）。
- `data/content.json` は初期シード兼フォールバックとして残しています。
- `index.html` は移植元として残してあります（削除して問題ありません）。
