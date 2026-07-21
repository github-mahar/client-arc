import { motion } from 'framer-motion';

const packages = [
  {
    id: '60min',
    name: '60 Minute Session',
    description: 'A focused, one-on-one session to address immediate concerns and find actionable coping strategies.',
    price: 'PKR 5,000',
    duration: '1 Session / 60 Mins',
    isPopular: false,
  },
  {
    id: '3sessions',
    name: '3 Sessions Package',
    description: 'Deep-dive counseling to unpack emotional blocks, establish therapeutic goals, and build resilience.',
    price: 'PKR 13,500',
    duration: '3 Sessions',
    isPopular: false,
  },
  {
    id: 'urgent',
    name: 'Urgent Session',
    description: 'Priority booking within 24 hours for acute distress, critical life events, or sudden relationship issues.',
    price: 'PKR 8,000',
    duration: '1 Session / Priority',
    isPopular: false,
  },
  {
    id: '5sessions',
    name: '5 Sessions Package',
    description: 'Comprehensive therapy plan exploring core behaviors, relationship dynamics, and lasting solutions.',
    price: 'PKR 20,000',
    duration: '5 Sessions',
    isPopular: true,
  },
  {
    id: 'physical',
    name: 'Physical Meeting',
    description: 'In-person premium consultation at our office, providing a safe, direct, and collaborative healing environment.',
    price: 'PKR 20,000',
    duration: '1 In-Person Session',
    isPopular: false,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="py-16 bg-[var(--neu-base)] transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="text-center space-y-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--neu-text)] transition-colors duration-300">
            Where To{' '}
            <span className="font-display text-[var(--neu-accent)] tracking-wider transition-colors duration-300">
              Start
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-[var(--neu-text-muted)] transition-colors duration-300">
            Choose the level of{' '}
            <span className="font-bold text-[var(--neu-accent)] transition-colors duration-300">support</span>{' '}
            that best fits your current needs and journey.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-10 items-stretch">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className={`relative flex flex-col w-full md:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] max-w-[380px] p-8 rounded-xl bg-[var(--neu-card-bg)] border ${pkg.isPopular
                  ? 'border-[var(--neu-accent)] shadow-[0_0_20px_rgba(184,121,31,0.08)] dark:shadow-[0_0_20px_rgba(240,168,56,0.15)]'
                  : 'border-[var(--neu-border)]'
                } transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Most Popular badge */}
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="neu-badge font-bold transition-colors duration-300">Most Popular</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--neu-text)] transition-colors duration-300">
                  {pkg.name}
                </h3>
                <p className="text-sm h-16 leading-relaxed text-[var(--neu-text-muted)] transition-colors duration-300">
                  {pkg.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="text-3xl font-extrabold text-[var(--neu-text)] mb-1 transition-colors duration-300">
                  {pkg.price}
                </div>
                <div className="text-sm font-bold text-[var(--neu-accent)] transition-colors duration-300">
                  {pkg.duration}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-[var(--neu-border)] transition-colors duration-300">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 px-4 font-extrabold cursor-pointer transition-all duration-300 ${pkg.isPopular ? 'neu-btn-primary' : 'neu-btn'
                    }`}
                >
                  Choose This Package
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
