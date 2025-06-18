import React from 'react';
import { motion } from 'framer-motion';
import { useParallaxElement } from '../hooks/useParallax';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.1, 
  className = '' 
}) => {
  const parallaxStyle = useParallaxElement(speed);

  return (
    <motion.div
      style={parallaxStyle}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;