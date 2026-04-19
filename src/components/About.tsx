import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-display tracking-tight text-text">About Me</h2>
          <p className="text-lg text-text-dim leading-relaxed">
            I'm a full-stack developer passionate about creating clean, performant, and accessible web applications. With over 5 years of experience, I specialize in React, TypeScript, and modern CSS architecture.
          </p>
        </motion.div>
      </div>
    </section>
  );
};