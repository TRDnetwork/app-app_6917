import { motion } from 'framer-motion';

const projects = [
  {
    title: "E-Commerce Dashboard",
    description: "A responsive admin dashboard with real-time analytics, inventory management, and order tracking.",
    link: "#project-1"
  },
  {
    title: "Task Management App",
    description: "Collaborative to-do app with drag-and-drop interface, team assignments, and deadline tracking.",
    link: "#project-2"
  },
  {
    title: "Weather Forecast Tool",
    description: "Minimalist weather app pulling live data with location detection and 7-day forecasts.",
    link: "#project-3"
  }
];

export const Projects = () => {
  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-display tracking-tight text-text">Featured Projects</h2>
          <p className="text-lg text-text-dim max-w-2xl mx-auto">
            A selection of recent work that demonstrates my approach to problem-solving and design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="block p-6 bg-bg rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-out-quart border border-transparent hover:border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:scale-[1.02] active:scale-100"
              tabIndex={0}
              aria-label={`${project.title}: ${project.description}`}
            >
              <h3 className="text-xl font-bold mb-3 text-text font-display">{project.title}</h3>
              <p className="text-text-dim leading-relaxed">{project.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
---