import { motion } from 'framer-motion';

function Hero({ heroTitle, heroSubtitle }) {
  return (
    <section id="hero" className="hero">
      <div className="stars"></div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="hero-tag">ENTER THE MULTIVERSE</p>
        <h1>{heroTitle}</h1>
        <p>{heroSubtitle}</p>
      </motion.div>
    </section>
  );
}

export default Hero;