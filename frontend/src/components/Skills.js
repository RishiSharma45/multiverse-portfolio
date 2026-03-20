import { motion } from 'framer-motion';

function Skills({ skills = [] }) {
  return (
    <motion.section
      id="skills"
      className="section glass-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Skills Universe</h2>

      <div className="skills-list">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))
        ) : (
          <p>No skills added yet.</p>
        )}
      </div>
    </motion.section>
  );
}

export default Skills;