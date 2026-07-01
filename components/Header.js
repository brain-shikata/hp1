export default function Header() {
  return (
    <header>
      <div className="container">
        <nav className="nav">
          <a href="#" className="logo">
            Sample&nbsp;Co.
          </a>
          <ul className="nav-links">
            <li>
              <a href="#services">サービス</a>
            </li>
            <li>
              <a href="#about">私たちについて</a>
            </li>
            <li>
              <a href="#contact">お問い合わせ</a>
            </li>
          </ul>
          <a href="#contact" className="nav-cta">
            無料相談
          </a>
          <button className="menu-toggle" aria-label="メニュー">
            ☰
          </button>
        </nav>
      </div>
    </header>
  );
}
