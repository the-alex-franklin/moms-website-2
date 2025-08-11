import React, { useId, useState } from "react";

/**
 * Physical Therapy Landing Page
 * - Fully typed
 * - Accessible (labels, aria, focus states)
 * - Responsive without external CSS libs
 * - Minimal, modern aesthetic
 *
 * Usage:
 *   import PTClinicPage from "./PTClinicPage";
 *   export default function App() { return <PTClinicPage />; }
 */

type Service = {
  icon: string;
  title: string;
  blurb: string;
};

type Therapist = {
  name: string;
  credentials: string;
  headshot?: string; // optional URL
  focus: string[];
  bio: string;
};

type Insurance = {
  name: string;
  note?: string;
};

type Testimonial = {
  quote: string;
  name: string;
  detail?: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type AppointmentForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  insurance?: string;
  reason: string;
  preferredDate?: string;
  preferredTime?: string;
};

const SERVICES: Service[] = [
  {
    icon: "🦵",
    title: "Post-Op Rehab",
    blurb: "Evidence-based protocols to rebuild strength, mobility, and confidence after surgery.",
  },
  {
    icon: "🏃‍♀️",
    title: "Sports Therapy",
    blurb: "Return-to-sport plans tailored to your season, position, and goals.",
  },
  {
    icon: "🧠",
    title: "Neuro Rehab",
    blurb: "Stroke, MS, and balance-focused therapy to improve function and independence.",
  },
  {
    icon: "🏋️",
    title: "Back & Neck",
    blurb: "Manual therapy and active care to reduce pain and prevent recurrences.",
  },
  {
    icon: "🤱",
    title: "Women’s Health",
    blurb: "Pelvic floor and postpartum care with a gentle, private approach.",
  },
  {
    icon: "👵",
    title: "Healthy Aging",
    blurb: "Fall prevention, gait training, and everyday strength for life on your terms.",
  },
];

const THERAPISTS: Therapist[] = [
  {
    name: "Dr. Maria Franklin",
    credentials: "PT, DPT, OCS",
    headshot: "",
    focus: ["Orthopedics", "Manual Therapy", "Shoulder & Knee"],
    bio: "Clinic director with 12+ years of experience helping people move without pain. Loves dogs and trail days.",
  },
  {
    name: "Jamal Ortega",
    credentials: "PT, DPT, CSCS",
    headshot: "",
    focus: ["Sports Rehab", "Return-to-Run", "ACL"],
    bio: "Bridges the gap between rehab and performance with clear metrics and progressive loading.",
  },
];

const INSURANCE: Insurance[] = [
  { name: "Blue Cross" },
  { name: "UnitedHealthcare" },
  { name: "Aetna" },
  { name: "Medicare", note: "Accepted for eligible services" },
  { name: "Cigna" },
  { name: "Cash & HSA", note: "Prompt-pay discounts available" },
];

const TESTIMONIALS: Testimonial[] = [
  { quote: "Two months after my ACL surgery I was jogging again. Clear plan, great people.", name: "Riley S.", detail: "soccer" },
  { quote: "They actually listened. My back pain finally makes sense and I have tools that work.", name: "Kendra P." },
  { quote: "Flexible scheduling and real progress every week. 10/10.", name: "Marcus L." },
];

const FAQ: FaqItem[] = [
  {
    q: "Do I need a doctor’s referral?",
    a: "In most cases, no. Our state allows direct access to physical therapy. Some insurers may still require a referral—call us and we’ll check for you.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Photo ID, insurance card (if using insurance), any relevant imaging or MD notes, and comfortable clothes you can move in.",
  },
  {
    q: "How long are appointments?",
    a: "Initial evaluations are typically 60 minutes. Follow-ups are 40–50 minutes depending on your plan of care.",
  },
];

const srOnly = {
  position: "absolute" as const,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden" as const,
  clip: "rect(0,0,0,0)" as const,
  whiteSpace: "nowrap" as const,
  border: 0,
};

// Basic, local styles (no build tools needed)
const styles = `
:root{
  --bg: #0f172a;
  --panel: #0b1223;
  --muted: #93a4c3;
  --brand: #3b82f6;
  --brand-2: #22d3ee;
  --ring: #60a5fa;
  --text: #e2e8f0;
  --text-strong:#f8fafc;
  --card:#0d1426;
  --border: #1e293b;
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;background:radial-gradient(1200px 600px at 10% -10%, rgba(59,130,246,.25), transparent 60%), radial-gradient(1200px 600px at 110% 10%, rgba(34,211,238,.2), transparent 60%), var(--bg); color:var(--text); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;}
a{color:inherit;text-decoration:none}
.container{max-width:1120px;margin-inline:auto;padding:24px}
.nav{position:sticky;top:0;backdrop-filter:saturate(120%) blur(8px); background:linear-gradient(180deg, rgba(13,20,38,.85), rgba(13,20,38,.65)); border-bottom:1px solid var(--border); z-index:10}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:12px 24px}
.brand{display:flex;align-items:center;gap:12px;font-weight:700;letter-spacing:.2px}
.badge{font-size:12px;padding:2px 6px;border:1px solid var(--border);border-radius:999px;color:var(--muted)}
.cta{display:inline-flex;align-items:center;gap:10px;padding:10px 16px;border-radius:12px;background:linear-gradient(135deg,var(--brand),var(--brand-2));color:white;font-weight:600;border:none;cursor:pointer;box-shadow:0 8px 30px rgba(59,130,246,.25)}
.cta:focus{outline:2px solid var(--ring);outline-offset:2px}
.hero{padding:64px 24px 24px}
.hero-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:32px;align-items:center}
@media (max-width: 900px){.hero-grid{grid-template-columns:1fr;}}
.h1{font-size:clamp(28px,4vw,44px);line-height:1.1;margin:0 0 12px;color:var(--text-strong)}
.lead{font-size:clamp(16px,2vw,18px);color:var(--muted);margin:0 0 24px;max-width:60ch}
.card{background:linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.0)); border:1px solid var(--border); border-radius:16px; padding:20px; box-shadow: 0 10px 30px rgba(2,6,23,.35)}
.pill{display:inline-flex;gap:10px;align-items:center;border:1px dashed var(--border);border-radius:999px;padding:8px 12px;color:var(--muted);font-size:14px}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px}
.kpi{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;text-align:center}
.kpi .v{font-size:24px;font-weight:800}
.section{padding:24px 0}
.h2{font-size:24px;margin:0 0 8px;color:var(--text-strong)}
.sub{color:var(--muted);margin:0 0 20px}
.grid{display:grid;gap:16px}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-2{grid-template-columns:repeat(2,1fr)}
@media (max-width: 900px){.grid-3,.grid-2{grid-template-columns:1fr}}
.service{display:flex;gap:12px;background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px}
.service .icon{font-size:22px}
.staff{display:flex;flex-direction:column;gap:12px;background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px}
.staff h3{margin:0}
.chips{display:flex;gap:8px;flex-wrap:wrap}
.chip{border:1px solid var(--border);border-radius:999px;padding:6px 10px;font-size:12px;color:var(--muted)}
.ins-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px}
.quote{background:linear-gradient(180deg, rgba(34,211,238,.08), rgba(59,130,246,.08)); border:1px solid var(--border);border-radius:14px;padding:16px}
.faq{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px}
.form{display:grid;gap:12px}
.row{display:grid;gap:12px;grid-template-columns:repeat(2,1fr)}
@media (max-width: 680px){.row{grid-template-columns:1fr}}
label{font-size:14px;color:var(--muted)}
input,select,textarea{width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:#0b1223;color:var(--text)}
input:focus,select:focus,textarea:focus{outline:2px solid var(--ring);outline-offset:2px}
small.help{color:var(--muted)}
.footer{margin-top:32px;padding:24px;border-top:1px solid var(--border);color:var(--muted);font-size:14px}
hr.sep{border:0;border-top:1px dashed var(--border);margin:24px 0}
`;

function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} fill="none">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d="M4 8c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v8c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8Z" stroke="url(#g)" strokeWidth="1.6" />
      <path d="M7 12h10M12 7v10" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="kpi" role="group" aria-label={label}>
      <div className="v">{value}</div>
      <div style={{ color: "var(--muted)", fontSize: 13 }}>{label}</div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <div className="pill">{children}</div>;
}

function Field({
  id,
  label,
  children,
  required,
  hint,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id}>
        {label} {required && <span aria-hidden>*</span>}
      </label>
      {children}
      {hint && <small className="help">{hint}</small>}
    </div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section container">
      <h2 className="h2">{title}</h2>
      {subtitle && <p className="sub">{subtitle}</p>}
      {children}
    </section>
  );
}

export default function PTClinicPage() {
  const [form, setForm] = useState<AppointmentForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    insurance: "",
    reason: "",
    preferredDate: "",
    preferredTime: "",
  });
  const [submitted, setSubmitted] = useState<null | "ok" | "err">(null);
  const formId = useId();

  function update<K extends keyof AppointmentForm>(key: K, value: AppointmentForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Simple front-end validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.reason) {
      setSubmitted("err");
      return;
    }
    // Replace with real API call
    console.log("Appointment request:", form);
    setSubmitted("ok");
    // Optionally reset
    // setForm({ firstName:"", lastName:"", email:"", phone:"", insurance:"", reason:"", preferredDate:"", preferredTime:"" })
  }

  return (
    <>
      <style>{styles}</style>

      {/* JSON-LD for basic local business SEO (adjust values) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PhysicalTherapy",
            name: "Franklin Physical Therapy",
            image: "https://example.com/clinic.jpg",
            url: "https://example.com",
            telephone: "+1-555-555-0100",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Willow Ave",
              addressLocality: "Springfield",
              addressRegion: "CA",
              postalCode: "94000",
              addressCountry: "US",
            },
            openingHours: "Mo-Fr 08:00-18:00",
          }),
        }}
      />

      {/* Nav */}
      <header className="nav" role="banner">
        <div className="nav-inner container">
          <a href="#top" className="brand" aria-label="Franklin Physical Therapy home">
            <Logo />
            <span>Franklin Physical Therapy</span>
            <span className="badge">Since 2012</span>
          </a>
          <nav aria-label="Primary">
            <a href="#services" style={{ marginRight: 14 }}>Services</a>
            <a href="#team" style={{ marginRight: 14 }}>Team</a>
            <a href="#insurance" style={{ marginRight: 14 }}>Insurance</a>
            <a href="#contact" style={{ marginRight: 14 }}>Contact</a>
            <a href="#book">
              <button className="cta" aria-label="Book an appointment">Book</button>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div id="top" className="hero container">
        <div className="hero-grid">
          <div>
            <div className="pill" aria-hidden>
              <span>🏥 In-person & Telehealth</span>
              <span>•</span>
              <span>New patients welcome</span>
            </div>
            <h1 className="h1">Move with confidence. Heal with a plan.</h1>
            <p className="lead">
              One-on-one physical therapy that blends hands-on care with progressive exercise.
              Clear goals, measurable progress, and a team that actually listens.
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a href="#book"><button className="cta">Request an appointment</button></a>
              <a href="#services" aria-label="See our services">See services →</a>
            </div>

            <div className="kpis" aria-label="Clinic highlights">
              <Stat value="12+" label="Years serving the community" />
              <Stat value="4.9★" label="Average patient rating" />
              <Stat value="1:1" label="Therapist attention" />
            </div>
          </div>

          <div className="card" role="img" aria-label="Smiling therapist helping a patient stretch">
            <div style={{ aspectRatio: "4/3", borderRadius: 12, background: "linear-gradient(135deg, rgba(59,130,246,.25), rgba(34,211,238,.18))", border: "1px solid var(--border)" }} />
            <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 10 }}>
              Real progress comes from great plans and great people.
            </p>
          </div>
        </div>
      </div>

      {/* Services */}
      <Section id="services" title="What we treat" subtitle="Personalized programs for every body.">
        <div className="grid grid-3">
          {SERVICES.map((s) => (
            <article key={s.title} className="service">
              <div className="icon" aria-hidden>{s.icon}</div>
              <div>
                <h3 style={{ margin: 0 }}>{s.title}</h3>
                <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>{s.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section id="team" title="Your care team" subtitle="Licensed physical therapists, one-to-one care.">
        <div className="grid grid-2">
          {THERAPISTS.map((t) => (
            <article key={t.name} className="staff">
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div
                  aria-hidden
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(59,130,246,.25), rgba(34,211,238,.18))",
                    border: "1px solid var(--border)",
                  }}
                />
                <div>
                  <h3 style={{ margin: 0 }}>{t.name}</h3>
                  <div style={{ color: "var(--muted)", fontSize: 14 }}>{t.credentials}</div>
                </div>
              </div>
              <p style={{ margin: 0 }}>{t.bio}</p>
              <div className="chips">
                {t.focus.map((f) => (
                  <span className="chip" key={f}>{f}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Insurance */}
      <Section id="insurance" title="Insurance & Payments" subtitle="We verify benefits for you before your first visit.">
        <div className="grid grid-3">
          {INSURANCE.map((i) => (
            <div key={i.name} className="ins-card">
              <strong>{i.name}</strong>
              {i.note && <div style={{ color: "var(--muted)", fontSize: 13 }}>{i.note}</div>}
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, color: "var(--muted)" }}>
          Don’t see your plan? Call <a href="tel:+15555550100">555-555-0100</a> — we can often submit out-of-network.
        </p>
      </Section>

      {/* Testimonials */}
      <Section title="Patient stories" subtitle="Real people. Real results.">
        <div className="grid grid-3">
          {TESTIMONIALS.map((t, idx) => (
            <figure key={idx} className="quote">
              <blockquote style={{ margin: 0, fontSize: 16, lineHeight: 1.45 }} aria-label={`Testimonial from ${t.name}`}>
                “{t.quote}”
              </blockquote>
              <figcaption style={{ marginTop: 10, color: "var(--muted)", fontSize: 14 }}>
                — {t.name}{t.detail ? `, ${t.detail}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section title="FAQ">
        <div className="grid grid-2">
          {FAQ.map((f) => (
            <details key={f.q} className="faq">
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>{f.q}</summary>
              <hr className="sep" />
              <p style={{ margin: 0, color: "var(--muted)" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Contact / Booking */}
      <Section id="book" title="Request an appointment" subtitle="Tell us a little and we’ll reach out to schedule.">
        <form className="form card" aria-describedby={`${formId}-help`} onSubmit={onSubmit}>
          <p id={`${formId}-help`} style={srOnly}>
            All fields marked with * are required.
          </p>
          <div className="row">
            <Field id={`${formId}-first`} label="First name" required>
              <input
                id={`${formId}-first`}
                name="firstName"
                autoComplete="given-name"
                required
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
              />
            </Field>
            <Field id={`${formId}-last`} label="Last name" required>
              <input
                id={`${formId}-last`}
                name="lastName"
                autoComplete="family-name"
                required
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
              />
            </Field>
          </div>

          <div className="row">
            <Field id={`${formId}-email`} label="Email" required>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </Field>
            <Field id={`${formId}-phone`} label="Phone" required>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Field>
          </div>

          <div className="row">
            <Field id={`${formId}-insurance`} label="Insurance">
              <select
                id={`${formId}-insurance`}
                name="insurance"
                value={form.insurance}
                onChange={(e) => update("insurance", e.target.value)}
              >
                <option value="">Select an option</option>
                {INSURANCE.map((i) => (
                  <option key={i.name} value={i.name}>{i.name}</option>
                ))}
                <option value="Other / Self-Pay">Other / Self-Pay</option>
              </select>
            </Field>
            <Field id={`${formId}-date`} label="Preferred date">
              <input
                id={`${formId}-date`}
                name="preferredDate"
                type="date"
                value={form.preferredDate}
                onChange={(e) => update("preferredDate", e.target.value)}
              />
            </Field>
          </div>

          <div className="row">
            <Field id={`${formId}-time`} label="Preferred time">
              <input
                id={`${formId}-time`}
                name="preferredTime"
                type="time"
                value={form.preferredTime}
                onChange={(e) => update("preferredTime", e.target.value)}
              />
            </Field>
            <div />
          </div>

          <Field id={`${formId}-reason`} label="How can we help?" required hint="Examples: ACL rehab, low back pain, balance, post-op knee">
            <textarea
              id={`${formId}-reason`}
              name="reason"
              rows={5}
              required
              value={form.reason}
              onChange={(e) => update("reason", e.target.value)}
            />
          </Field>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="cta" type="submit">Send request</button>
            {submitted === "ok" && <span role="status" style={{ color: "aquamarine" }}>Thanks! We’ll be in touch soon.</span>}
            {submitted === "err" && <span role="alert" style={{ color: "#fca5a5" }}>Please fill required fields.</span>}
          </div>
        </form>

        <div className="footer">
          <div>📍 123 Willow Ave, Springfield, CA • <a href="tel:+15555550100">555-555-0100</a> • M-F 8am–6pm</div>
          <div style={{ marginTop: 8 }}>
            Prefer to call? We’ll verify your benefits and book your first visit while you’re on the line.
          </div>
        </div>
      </Section>
    </>
  );
}
