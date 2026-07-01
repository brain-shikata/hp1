export default function Services({ services }) {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Services</span>
          <h2>提供するサービス</h2>
          <p>幅広いニーズにお応えする、中核サービスをご用意しています。</p>
        </div>
        <div className="card-grid">
          {services.map((s, i) => (
            <div className="card" key={i}>
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
