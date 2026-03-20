import { motion } from 'framer-motion';

function About({ aboutText }) {
  return (
    <motion.section
      id="about"
      className="section glass-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>About Me</h2>
      <p>{aboutText}</p>
    </motion.section>
  );
}

export default About;