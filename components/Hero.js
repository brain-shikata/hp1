export default function Hero({ hero }) {
  return (
    <section className="hero">
      <div className="container">
        <h1>
          {hero.titleBefore}
          <span className="accent">{hero.accent}</span>
          {hero.titleAfter}
        </h1>
        <p>{hero.subtitle}</p>
        <div>
          <a href="#contact" className="btn btn-primary">
            お問い合わせ
          </a>
          <a href="#services" className="btn btn-secondary">
            サービスを見る
          </a>
        </div>
      </div>
    </section>
  );
}
