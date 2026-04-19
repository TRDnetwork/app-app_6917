import React, { memo } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
}

// PERF: Memoize card to prevent unnecessary re-renders
const ProjectCard: React.FC<ProjectCardProps> = memo(({ title, description, link }) => {
  return (
    <article className="bg-surface p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 animate-slide-up">
      <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-dim mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline font-medium"
      >
        View Project →
      </a>
    </article>
  );
});

export default ProjectCard;
---