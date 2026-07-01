import { createClient } from "@supabase/supabase-js";

// site_content テーブルに単一行として保存する。
const TABLE = "site_content";
const CONTENT_ID = 1;

// テーブル未作成・値未保存のときに使う初期コンテンツ。
export const DEFAULT_CONTENT = {
  hero: {
    titleBefore: "ビジネスを、",
    accent: "次のステージ",
    titleAfter: "へ。",
    subtitle:
      "私たちは、お客様の課題に寄り添い、最適なソリューションをご提供します。まずはお気軽にお問い合わせください。",
  },
  services: [
    {
      icon: "💡",
      title: "コンサルティング",
      desc: "経験豊富な専門家が、事業の成長を戦略から実行まで一貫して支援します。",
    },
    {
      icon: "⚙️",
      title: "システム開発",
      desc: "要件定義から運用まで、目的に合った高品質なシステムを構築します。",
    },
    {
      icon: "📈",
      title: "マーケティング支援",
      desc: "データに基づいた施策で、集客と売上の向上をサポートします。",
    },
  ],
  about: {
    heading: "私たちについて",
    paragraphs: [
      "私たちは、テクノロジーとアイデアの力で、お客様のビジネスに新しい価値を生み出すことを使命としています。",
      "小さな課題から大きな変革まで、パートナーとして共に歩みます。",
    ],
    stats: [
      { num: "10+", label: "年の実績" },
      { num: "200+", label: "支援プロジェクト" },
      { num: "98%", label: "顧客満足度" },
    ],
  },
  contact: {
    heading: "お気軽にご相談ください",
    text: "サービスに関するご質問やお見積もりのご依頼など、どんなことでもお問い合わせください。",
    email: "info@example.com",
  },
};

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// 現在のコンテンツを取得する。未設定・エラー時は初期値を返す。
export async function getContent() {
  const supabase = getClient();
  if (!supabase) return DEFAULT_CONTENT;

  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", CONTENT_ID)
      .maybeSingle();

    if (error || !data?.data) return DEFAULT_CONTENT;
    // 欠けたキーは初期値で補完する。
    return { ...DEFAULT_CONTENT, ...data.data };
  } catch {
    return DEFAULT_CONTENT;
  }
}

// コンテンツを保存する（単一行を upsert）。
export async function saveContent(body) {
  const supabase = getClient();
  if (!supabase) throw new Error("Supabase が設定されていません。");

  const { data, error } = await supabase
    .from(TABLE)
    .upsert({
      id: CONTENT_ID,
      data: body,
      updated_at: new Date().toISOString(),
    })
    .select("data")
    .single();

  if (error) throw new Error(error.message);
  return data.data;
}
