import { motion } from 'framer-motion';
import { UserCheck, Scale, BrainCircuit } from 'lucide-react';

export default function AboutMe() {
  const features = [
    {
      icon: <UserCheck className="w-6 h-6 text-[var(--neu-accent)]" />,
      title: 'Experienced Counselor',
      description: 'Over 8 years of clinical experience guiding couples through complex relationship hurdles.',
    },
    {
      icon: <Scale className="w-6 h-6 text-[var(--neu-accent)]" />,
      title: 'Unbiased Approach',
      description: 'Providing a neutral, empathetic, and confidential environment where both parties are truly heard.',
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-[var(--neu-accent)]" />,
      title: 'Psychology & Shariah',
      description: 'Bridging the gap between empirical science and theological principles for holistic healing.',
    },
  ];

  const useCases = [
    'Self-development',
    'Relationships',
    'Career decisions',
    'Marital challenges',
    'Spiritual well-being'
  ];

  return (
    <section id="about-me" className="py-16 overflow-hidden bg-[var(--neu-base)] transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Content Side — flat-card */}
        <motion.div
          className="flat-card w-full max-w-4xl space-y-8 p-8 md:p-12 bg-[var(--neu-card-bg)] border border-[var(--neu-border)] rounded-xl transition-all duration-300 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-4">
            <span className="font-bold tracking-widest uppercase text-xs text-[var(--neu-accent)] transition-colors duration-300">
              About Me
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-[var(--neu-text)] transition-colors duration-300">
              A Different Kind of{' '}
              <span className="font-display text-[var(--neu-accent)] tracking-wider transition-colors duration-300">
                Counseling
              </span>
            </h2>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[var(--neu-text)] transition-colors duration-300">Abdul Rehman Cheema</h3>
              <p className="text-base md:text-lg leading-relaxed text-[var(--neu-text-muted)] transition-colors duration-300">
                Islamic counselor blending Psychology, Neuroscience, and Shariah to provide practical guidance. By bridging the gap between empirical science and theological principles, I help couples and individuals navigate life's challenges, cultivate healthy relationships, and find spiritual and emotional well-being.
              </p>
            </div>
          </div>

          {/* Features list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-[var(--neu-border)] transition-colors duration-300">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center space-y-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
              >
                {/* Icon wrapper */}
                <div className="p-3 bg-[var(--neu-base)] border border-[var(--neu-border)] rounded-full flex-shrink-0 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-[var(--neu-text)] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--neu-text-muted)] transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Use-cases Tag list */}
          <div className="pt-6 border-t border-[var(--neu-border)] transition-colors duration-300">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--neu-accent)] mb-4 transition-colors duration-300">
              Focus Areas & Specialization
            </h4>
            <div className="flex flex-wrap justify-center gap-2.5">
              {useCases.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 bg-[var(--neu-base)] border border-[var(--neu-border)] text-[var(--neu-text-muted)] text-xs font-bold rounded-lg hover:border-[var(--neu-accent)] hover:text-[var(--neu-text)] transition-colors duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
