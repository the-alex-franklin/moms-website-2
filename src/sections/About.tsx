type AboutProps = {
  photoSrc: string;
  name?: string;
  heading?: string;
  children?: React.ReactNode;
};

export function About({ photoSrc, name = "About Me", heading = "Meet Your Therapist", children }: AboutProps) {
  return (
    <section id="about" className="container mx-auto my-16 px-4">
      <div className="flex flex-col-reverse items-center gap-4 md:flex-row">
        {/* Photo */}
        <figure
          className="flex-shrink-0 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 
                     rounded-full overflow-hidden shadow-lg bg-white"
        >
          <img
            src={photoSrc}
            alt="Therapist portrait"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>

        {/* Text */}
        <article className="bg-white rounded-xl shadow-lg p-6 flex-1 w-full max-w-prose">
          <header className="mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">{heading}</h2>
            <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          </header>
          <div className="prose max-w-none text-gray-700">
            {children || (
              <p>
                I’m a licensed physical therapist specializing in personalized, hands-on care. My practice blends
                evidence-based treatment with compassionate, one-on-one sessions to help you reduce pain, restore
                function, and feel at home in your body.
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
