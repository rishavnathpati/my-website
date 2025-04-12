'use client';

import { motion, Variants } from 'framer-motion';
import React from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean; // Trigger animation only once
  amount?: number | 'some' | 'all'; // Amount of element visible before triggering
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
  once = true,
  amount = 0.2, // Trigger when 20% of the element is visible
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration: 0.5, delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;
