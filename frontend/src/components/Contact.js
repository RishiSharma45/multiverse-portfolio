import { motion } from 'framer-motion';

function Contact({ email, linkedIn, gitHub }) {
  return (
    <motion.section
      id="contact"
      className="section glass-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Contact Portal</h2>
      <p>Email: {email}</p>
      <p>LinkedIn: {linkedIn}</p>
      <p>GitHub: {gitHub}</p>
    </motion.section>
  );
}

export default Contact;