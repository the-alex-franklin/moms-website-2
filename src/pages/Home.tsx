import { Hero } from "../sections/Hero";
import { Services } from "../sections/Services";
import { Contact } from "../sections/Contact";
import { About } from "../sections/About";

export function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About photoSrc="/profile.jpg" />
      <Contact />
    </main>
  );
}
