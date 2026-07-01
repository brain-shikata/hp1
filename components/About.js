export default function About({ about }) {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2>{about.heading}</h2>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="stats">
              {about.stats.map((s, i) => (
                <div className="stat" key={i}>
                  <div className="num">{s.num}</div>
                  <div className="label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual">Our Vision</div>
        </div>
      </div>
    </section>
  );
}
