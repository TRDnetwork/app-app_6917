import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center py-24 px-6 sm:py-32 lg:py-40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6 font-display tracking-tight">
          Hi, I'm <span className="text-accent">Alex Rivera</span>
        </h1>
        <p className="text-xl sm:text-2xl text-text-dim mb-8 max-w-3xl leading-relaxed">
          Building elegant digital experiences with precision and purpose.
        </p>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          className="bg-accent text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-out-quart inline-flex items-center gap-2 animate-pulse-slow"
          aria-label="Contact me"
        >
          Get In Touch
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
};
---