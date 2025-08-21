export function Hero() {
  return (
    <section className="relative flex items-end sm:items-center justify-center text-center h-[80vw] max-h-[92vh] bg-[url('/hero.jpg')] bg-cover bg-[position:0%_35%] overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="flex flex-col relative px-4 z-10 max-w-[700px] text-white sm:translate-y-36">
        <h1 className="text-white text-5xl font-bold font-calli mb-4">Whim Physical Therapy, PC</h1>
        <p className="text-2xl mb-8 font-calli">In-home physical therapy</p>
      </div>
    </section>
  );
}
