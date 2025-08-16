type AboutProps = {
  photoSrc: string;
  name?: string;
  heading?: string;
  children?: React.ReactNode;
};

export function About({
  photoSrc,
  name = "About Me",
  heading = "Meet Your Therapist",
  children,
}: AboutProps) {
  return (
    <section id="about" className="container mx-auto my-16 px-4">
      <div className="flex items-center justify-center gap-6">
        {/* Photo card */}
        <figure
          className="bg-white rounded-full flex-[1_1_14rem]   /* grow, shrink, base size ~14rem */
            sm:flex-[1_1_16rem]
            md:flex-[0_1_18rem]  /* on wider screens, let text take more space */
            min-w-[10rem] max-w-[22rem]
            aspect-square        /* keep it perfectly square */
            rounded-full overflow-hidden shadow-lg"
        >
          <img
            src={photoSrc}
            alt="Therapist portrait"
            className="w-full h-full object-cover translate-y-[5%] translate-x-[-12.5%] scale-150"
            loading="lazy"
            decoding="async"
          />
        </figure>

        {/* Text card */}
        <article className="bg-white rounded-xl shadow-lg p-6 flex-1">
          <header className="mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">
              {heading}
            </h2>
            <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          </header>
          <div className="prose max-w-none text-gray-700">
            {children || (
              <p>
                I’m a licensed physical therapist specializing in personalized,
                hands-on care. My practice blends evidence-based treatment with
                compassionate, one-on-one sessions to help you reduce pain,
                restore function, and feel at home in your body.
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
