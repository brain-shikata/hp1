"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContentEditor({ initial }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  // ---- 更新ヘルパー ----
  function setHero(key, value) {
    setData((d) => ({ ...d, hero: { ...d.hero, [key]: value } }));
  }
  function setContact(key, value) {
    setData((d) => ({ ...d, contact: { ...d.contact, [key]: value } }));
  }
  function setService(i, key, value) {
    setData((d) => {
      const services = d.services.map((s, idx) =>
        idx === i ? { ...s, [key]: value } : s
      );
      return { ...d, services };
    });
  }
  function addService() {
    setData((d) => ({
      ...d,
      services: [...d.services, { icon: "✨", title: "新しいサービス", desc: "" }],
    }));
  }
  function removeService(i) {
    setData((d) => ({ ...d, services: d.services.filter((_, idx) => idx !== i) }));
  }
  function setAbout(key, value) {
    setData((d) => ({ ...d, about: { ...d.about, [key]: value } }));
  }
  function setParagraph(i, value) {
    setData((d) => {
      const paragraphs = d.about.paragraphs.map((p, idx) =>
        idx === i ? value : p
      );
      return { ...d, about: { ...d.about, paragraphs } };
    });
  }
  function setStat(i, key, value) {
    setData((d) => {
      const stats = d.about.stats.map((s, idx) =>
        idx === i ? { ...s, [key]: value } : s
      );
      return { ...d, about: { ...d.about, stats } };
    });
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMsg({ type: "ok", text: "保存しました。サイトに反映されています。" });
        router.refresh();
      } else {
        const e = await res.json();
        setMsg({ type: "err", text: e.error || "保存に失敗しました。" });
      }
    } catch {
      setMsg({ type: "err", text: "通信エラーが発生しました。" });
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-wrap">
      <div className="admin-bar">
        <div className="brand">
          Sample Co. <span>サイト管理</span>
        </div>
        <div className="actions">
          <a
            href="/"
            target="_blank"
            className="btn-admin btn-ghost btn-sm"
            rel="noreferrer"
          >
            サイトを表示 ↗
          </a>
          <button className="btn-admin btn-ghost btn-sm" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </div>

      <div className="admin-main">
        <h1>コンテンツ編集</h1>
        <p className="lead">トップページの内容を編集できます。編集後「保存」を押してください。</p>

        {/* Hero */}
        <div className="panel">
          <h2>ヒーロー（トップ見出し）</h2>
          <div className="field">
            <label>見出し（前半）</label>
            <input
              value={data.hero.titleBefore}
              onChange={(e) => setHero("titleBefore", e.target.value)}
            />
          </div>
          <div className="field">
            <label>強調テキスト（青色部分）</label>
            <input
              value={data.hero.accent}
              onChange={(e) => setHero("accent", e.target.value)}
            />
          </div>
          <div className="field">
            <label>見出し（後半）</label>
            <input
              value={data.hero.titleAfter}
              onChange={(e) => setHero("titleAfter", e.target.value)}
            />
          </div>
          <div className="field">
            <label>サブテキスト</label>
            <textarea
              value={data.hero.subtitle}
              onChange={(e) => setHero("subtitle", e.target.value)}
            />
          </div>
        </div>

        {/* Services */}
        <div className="panel">
          <h2>サービス</h2>
          {data.services.map((s, i) => (
            <div className="subcard" key={i}>
              <div className="row">
                <div className="field" style={{ margin: 0 }}>
                  <label>アイコン</label>
                  <input
                    value={s.icon}
                    onChange={(e) => setService(i, "icon", e.target.value)}
                  />
                </div>
                <div className="field" style={{ margin: 0, gridColumn: "2 / 4" }}>
                  <label>タイトル</label>
                  <input
                    value={s.title}
                    onChange={(e) => setService(i, "title", e.target.value)}
                  />
                </div>
              </div>
              <div className="field" style={{ marginBottom: 12 }}>
                <label>説明</label>
                <textarea
                  value={s.desc}
                  onChange={(e) => setService(i, "desc", e.target.value)}
                />
              </div>
              <button
                className="btn-admin btn-danger btn-sm"
                onClick={() => removeService(i)}
              >
                削除
              </button>
            </div>
          ))}
          <button className="btn-admin btn-blue btn-sm" onClick={addService}>
            + サービスを追加
          </button>
        </div>

        {/* About */}
        <div className="panel">
          <h2>私たちについて</h2>
          <div className="field">
            <label>見出し</label>
            <input
              value={data.about.heading}
              onChange={(e) => setAbout("heading", e.target.value)}
            />
          </div>
          {data.about.paragraphs.map((p, i) => (
            <div className="field" key={i}>
              <label>本文 {i + 1}</label>
              <textarea value={p} onChange={(e) => setParagraph(i, e.target.value)} />
            </div>
          ))}
          <label
            style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, margin: "8px 0 6px" }}
          >
            実績数値
          </label>
          {data.about.stats.map((s, i) => (
            <div className="row stat" key={i}>
              <div className="field" style={{ margin: 0 }}>
                <label>数値</label>
                <input value={s.num} onChange={(e) => setStat(i, "num", e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>ラベル</label>
                <input value={s.label} onChange={(e) => setStat(i, "label", e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="panel">
          <h2>お問い合わせ</h2>
          <div className="field">
            <label>見出し</label>
            <input
              value={data.contact.heading}
              onChange={(e) => setContact("heading", e.target.value)}
            />
          </div>
          <div className="field">
            <label>説明文</label>
            <textarea
              value={data.contact.text}
              onChange={(e) => setContact("text", e.target.value)}
            />
          </div>
          <div className="field">
            <label>問い合わせ先メールアドレス</label>
            <input
              value={data.contact.email}
              onChange={(e) => setContact("email", e.target.value)}
            />
          </div>
        </div>

        <div className="save-bar">
          {msg && <span className={`msg ${msg.type}`}>{msg.text}</span>}
          <button
            className="btn-admin btn-blue"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "保存中..." : "保存する"}
          </button>
        </div>
      </div>
    </div>
  );
}
