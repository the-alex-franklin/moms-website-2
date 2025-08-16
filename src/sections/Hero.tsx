export function Hero() {
  return (
    <section className="relative flex items-center justify-center text-center h-[80vh] bg-[url('/hero.jpg')] bg-cover bg-[position:0_42.5%]">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-[700px] px-4 text-white">
        <h1 className="text-white text-5xl font-bold font-calli mb-4">
          Welcome
        </h1>
        <p className="text-2xl mb-8 font-calli">In-home Physical Therapy</p>
        <a
          href="#cta"
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded"
        >
          Call to Action
        </a>
      </div>
    </section>
  );
}
