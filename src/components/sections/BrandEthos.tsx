import React, { useState } from 'react';
import { Leaf, Hammer, Wind, ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// ── Brand values data ────────────────────────────────────────────────────────
const values = [
  {
    icon: Leaf,
    title: 'Sustainable Materials',
    desc: 'Every fabric is sourced from certified organic and low-impact suppliers — no compromises.',
  },
  {
    icon: Hammer,
    title: 'Ethical Craftsmanship',
    desc: 'Handcrafted by fairly paid artisans. Quality you can feel, conscience you can keep.',
  },
  {
    icon: Wind,
    title: 'Carbon Neutral',
    desc: 'From production to your door, we offset every gram of our carbon footprint.',
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export const BrandEthos: React.FC = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className={`${dark ? 'bg-brand-950' : 'bg-[#f9f7f4]'}`}>

      {/* ── Top divider rule ── */}
      <div className={`h-px w-full ${dark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />

      {/* ── Split layout: values left / newsletter right ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT — Brand values ─────────────────────────────────────────── */}
        <div className={`
          py-20 lg:py-28 lg:pr-16 xl:pr-24
          ${dark ? '' : ''}
        `}>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`h-px w-8 ${dark ? 'bg-neutral-600' : 'bg-neutral-400'}`} />
            <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
              dark ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              Our Promise
            </span>
          </div>

          {/* Heading */}
          <h2 className={`font-display leading-tight mb-10 ${dark ? 'text-white' : 'text-brand-900'}`}>
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-light italic">Dressed well,</span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold">Done right.</span>
          </h2>

          {/* Values list */}
          <ul className="space-y-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-5">
                {/* Icon box — thin stroke, no fill */}
                <div className={`
                  flex-shrink-0 w-10 h-10 flex items-center justify-center
                  border transition-colors duration-200
                  ${dark
                    ? 'border-neutral-700 text-neutral-400'
                    : 'border-neutral-300 text-neutral-500'
                  }
                `}>
                  <Icon size={18} strokeWidth={1.25} />
                </div>

                <div>
                  <p className={`text-sm font-semibold mb-1 ${
                    dark ? 'text-neutral-100' : 'text-brand-900'
                  }`}>
                    {title}
                  </p>
                  <p className={`text-sm leading-relaxed ${
                    dark ? 'text-neutral-500' : 'text-gray-500'
                  }`}>
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Vertical divider (desktop only) ── */}
        <div className={`hidden lg:block absolute left-1/2 top-0 bottom-0 w-px ${
          dark ? 'bg-neutral-800' : 'bg-neutral-200'
        }`} />

        {/* ── RIGHT — Newsletter ──────────────────────────────────────────── */}
        <div className={`
          relative
          py-20 lg:py-28 lg:pl-16 xl:pl-24
          flex flex-col justify-center
          border-t lg:border-t-0 lg:border-l
          ${dark ? 'border-neutral-800' : 'border-neutral-200'}
        `}>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`h-px w-8 ${dark ? 'bg-neutral-600' : 'bg-neutral-400'}`} />
            <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
              dark ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              Stay Connected
            </span>
          </div>

          {/* Heading */}
          <h2 className={`font-display leading-tight mb-4 ${dark ? 'text-white' : 'text-brand-900'}`}>
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-light italic">The edit,</span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold">in your inbox.</span>
          </h2>

          <p className={`text-sm leading-relaxed mb-10 max-w-sm ${
            dark ? 'text-neutral-500' : 'text-gray-500'
          }`}>
            New arrivals, exclusive offers, and style notes — delivered quietly, never spammed.
          </p>

          {/* Newsletter form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-sm">
              {/* Input + button — sharp edges, fashion-house style */}
              <div className={`flex border ${dark ? 'border-neutral-700' : 'border-neutral-300'}`}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`
                    flex-1 px-4 py-3.5 text-sm bg-transparent
                    placeholder:text-neutral-400
                    focus:outline-none
                    ${dark ? 'text-white' : 'text-brand-900'}
                  `}
                />
                <button
                  type="submit"
                  className={`
                    flex items-center gap-2 px-5 py-3.5
                    text-xs font-semibold uppercase tracking-[0.15em]
                    transition-colors duration-150 flex-shrink-0
                    ${dark
                      ? 'bg-white text-black hover:bg-neutral-100'
                      : 'bg-brand-900 text-white hover:bg-brand-800'
                    }
                  `}
                >
                  Subscribe
                  <ArrowRight size={13} strokeWidth={2} />
                </button>
              </div>

              {/* Micro-copy */}
              <p className={`text-[11px] mt-3 ${dark ? 'text-neutral-600' : 'text-neutral-400'}`}>
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            /* Success state */
            <div className="max-w-sm">
              <div className={`flex items-center gap-3 border px-5 py-4 ${
                dark ? 'border-neutral-700' : 'border-neutral-300'
              }`}>
                <Leaf size={16} strokeWidth={1.25} className={dark ? 'text-neutral-400' : 'text-neutral-500'} />
                <p className={`text-sm ${dark ? 'text-neutral-300' : 'text-brand-900'}`}>
                  You're on the list. Welcome to Reliance.
                </p>
              </div>
            </div>
          )}

          {/* Decorative large background letter */}
          <span
            aria-hidden="true"
            className={`
              absolute bottom-6 right-6 font-display text-[10rem] leading-none
              font-bold select-none pointer-events-none
              ${dark ? 'text-neutral-900' : 'text-neutral-100'}
            `}
          >
            R
          </span>
        </div>
      </div>

      {/* ── Bottom divider rule ── */}
      <div className={`h-px w-full ${dark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
    </section>
  );
};
