import { motion } from 'framer-motion';

function ProjectCard({ project }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
    >
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      {project.extraFields && (
        <div className="extra-fields">
          {Object.entries(project.extraFields).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong>{' '}
              {Array.isArray(value) ? value.join(', ') : String(value)}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default ProjectCard;