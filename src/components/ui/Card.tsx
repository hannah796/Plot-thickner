import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick
}) => {
  const baseClasses = 'bg-navy-800 border border-navy-700 rounded-lg p-6 transition-all duration-200';
  const hoverClasses = hover ? 'hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10 cursor-pointer' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`.trim();

  const CardComponent = (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {CardComponent}
      </motion.div>
    );
  }

  return CardComponent;
};

export default Card;
