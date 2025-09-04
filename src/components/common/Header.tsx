import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { UserProfile } from '../../types';

interface HeaderProps {
  user: UserProfile;
  currentStep?: number;
  totalSteps?: number;
}

const Header: React.FC<HeaderProps> = ({ user, currentStep, totalSteps }) => {
  return (
    <header className="bg-navy-900 border-b border-navy-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.h1
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Plot Thickener
          </motion.h1>
          
          {currentStep && totalSteps && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                Step {currentStep} of {totalSteps}
              </span>
              <div className="w-24 bg-navy-700 rounded-full h-1">
                <motion.div
                  className="h-full bg-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
