import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

function ProjectsSection({ projects = [] }) {
  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <motion.section
      id="projects"
      className="section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Projects Universe</h2>

      <div className="project-list">
        {safeProjects.length > 0 ? (
          safeProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </motion.section>
  );
}

export default ProjectsSection;