import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.98]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setIsSubmitted(true);
      reset();
    } catch (error) {
      // Error handled via form submission state
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans leading-relaxed">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-[#e6e4e0]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav aria-label="Main navigation">
            <ul className="flex space-x-8 text-sm font-medium">
              <li>
                <a
                  href="#hero"
                  className="text-text hover:text-accent transition-colors duration-300 border-b-2 border-transparent hover:border-accent"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-text hover:text-accent transition-colors duration-300 border-b-2 border-transparent hover:border-accent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-text hover:text-accent transition-colors duration-300 border-b-2 border-transparent hover:border-accent"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-text hover:text-accent transition-colors duration-300 border-b-2 border-transparent hover:border-accent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-6"
          style={{ opacity: heroOpacity, transform: `scale(${heroScale})` }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-text font-display tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              aria-label="Jane Doe, Full-Stack Developer & Designer"
            >
              <span className="block">Jane Doe</span>
              <span className="text-accent block mt-2">Full-Stack Developer & Designer</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-text-dim mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              Crafting elegant digital experiences with precision and purpose.
            </motion.p>
            <motion.a
              href="#contact"
              className="inline-block bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#ff8c42] transition-all duration-300 shadow-lg hover:shadow-accent/25 transform hover:translate-y-[-4px]"
              aria-label="Contact me to discuss opportunities"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              Get In Touch
            </motion.a>
          </div>
        </section>

        <section
          id="about"
          className="py-24 px-6"
          aria-labelledby="about-heading"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              id="about-heading"
              className="text-4xl font-black mb-8 text-center font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-lg text-text-dim leading-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm a passionate full-stack developer and designer with over 5 years of experience building
              digital products that balance aesthetics and functionality. My background in both design and
              engineering allows me to create holistic user experiences that are not only beautiful but also
              highly performant and accessible. I specialize in React, TypeScript, and modern CSS architecture,
              with a strong focus on user-centered design principles and clean, maintainable code.
            </motion.p>
          </div>
        </section>

        <section
          id="projects"
          className="py-24 px-6 bg-surface"
          aria-labelledby="projects-heading"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              id="projects-heading"
              className="text-4xl font-black mb-16 text-center font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:translate-y-[-8px] transition-all duration-300 border border-[#e6e4e0]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-text">{project.title}</h3>
                    <p className="text-text-dim mb-4 leading-relaxed">{project.description}</p>
                    <a
                      href={project.link}
                      className="inline-flex items-center text-accent font-semibold hover:text-[#ff8c42] transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-24 px-6"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2
              id="contact-heading"
              className="text-4xl font-black mb-12 text-center font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              Let's Work Together
            </motion.h2>

            {isSubmitted ? (
              <motion.div
                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                role="alert"
                aria-live="assertive"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-green-800 font-medium text-lg">
                  Thanks for reaching out! I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200 ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-[#e6e4e0] focus:ring-accent/50'
                    }`}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-red-500 text-sm"
                      role="alert"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-[#e6e4e0] focus:ring-accent/50'
                    }`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-red-500 text-sm"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-200 ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-[#e6e4e0] focus:ring-accent/50'
                    }`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1 text-red-500 text-sm"
                      role="alert"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#ff8c42] transition-all duration-300 shadow-lg hover:shadow-accent/25 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </motion.form>
            )}
          </div>
        </section>
      </main>

      <footer
        className="py-12 px-6 border-t border-[#e6e4e0] bg-surface"
        role="contentinfo"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-text-dim text-sm">
            © {new Date().getFullYear()} Jane Doe. Crafted with precision and care.
          </p>
        </div>
      </footer>
    </div>
  );
}

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured online store with product filtering, cart management, and secure checkout built with React and Node.js.',
    link: 'https://example.com/project1',
  },
  {
    title: 'Task Management App',
    description:
      'A collaborative productivity tool with real-time updates, task assignments, and progress tracking using WebSocket and React.',
    link: 'https://example.com/project2',
  },
  {
    title: 'Analytics Dashboard',
    description:
      'An interactive data visualization platform that transforms complex metrics into actionable insights with D3.js and TypeScript.',
    link: 'https://example.com/project3',
  },
];

export default App;