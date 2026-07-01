import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

// 管理画面での編集を即時反映させるため動的レンダリングにする
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return (
    <>
      <Header />
      <main>
        <Hero hero={content.hero} />
        <Services services={content.services} />
        <About about={content.about} />
        <CTA contact={content.contact} />
      </main>
      <Footer />
    </>
  );
}
