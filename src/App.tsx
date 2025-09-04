import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/screens/LandingPage';
import ScriptUpload from './components/screens/ScriptUpload';
import ScriptAnalysis from './components/screens/ScriptAnalysis';
import TrainModel from './components/screens/TrainModel';
import TrainingProgress from './components/screens/TrainingProgress';
import ProjectShots from './components/screens/ProjectShots';
import { mockUser, mockRecentProjects } from './utils/mockData';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LandingPage 
                    user={mockUser} 
                    recentProjects={mockRecentProjects} 
                  />
                </motion.div>
              } 
            />
            <Route 
              path="/script-upload" 
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScriptUpload user={mockUser} />
                </motion.div>
              } 
            />
            <Route 
              path="/script-analysis" 
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScriptAnalysis user={mockUser} />
                </motion.div>
              } 
            />
            <Route 
              path="/train-model" 
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrainModel user={mockUser} />
                </motion.div>
              } 
            />
            <Route 
              path="/training-progress" 
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrainingProgress user={mockUser} />
                </motion.div>
              } 
            />
            <Route 
              path="/project-shots" 
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectShots user={mockUser} />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
