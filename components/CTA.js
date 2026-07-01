export default function CTA({ contact }) {
  return (
    <section className="cta-band" id="contact">
      <div className="container">
        <h2>{contact.heading}</h2>
        <p>{contact.text}</p>
        <a href={`mailto:${contact.email}`} className="btn btn-primary">
          メールで問い合わせる
        </a>
      </div>
    </section>
  );
}
