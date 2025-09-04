import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Cpu, 
  ChevronDown, 
  ChevronUp,
  Users,
  MapPin,
  Palette
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import Header from '../common/Header';
import { useTrainingSimulation } from '../../hooks/useTrainingSimulation';
import { mockExtractedElements } from '../../utils/mockData';
import { UserProfile } from '../../types';

interface TrainingDashboardProps {
  user: UserProfile;
}

const TrainingDashboard: React.FC<TrainingDashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const { progress, startTraining, stopTraining } = useTrainingSimulation();
  const [selectedElements, setSelectedElements] = useState(mockExtractedElements);
  const [showParameters, setShowParameters] = useState(false);

  const handleElementToggle = (type: 'characters' | 'locations' | 'style', id: string) => {
    setSelectedElements(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    }));
  };

  const handleStartTraining = () => {
    startTraining();
  };

  const handleApproveResults = () => {
    navigate('/approval');
  };

  const getSelectedCount = (type: 'characters' | 'locations' | 'style') => {
    return selectedElements[type].filter(item => item.selected).length;
  };

  const totalSelected = getSelectedCount('characters') + getSelectedCount('locations') + getSelectedCount('style');

  return (
    <div className="min-h-screen bg-navy-900">
      <Header user={user} currentStep={2} totalSteps={3} />
      
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Training Dashboard
            </h1>
            <p className="text-gray-400">
              Select elements and configure training parameters
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Panel - Extracted Elements (25%) */}
            <div className="lg:col-span-3">
              <Card>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Extracted Elements
                </h2>
                
                <div className="space-y-6">
                  {/* Characters */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Users className="w-4 h-4 text-primary-400" />
                      <h3 className="font-medium text-white">Characters</h3>
                      <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
                        {getSelectedCount('characters')}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {selectedElements.characters.map(character => (
                        <label
                          key={character.id}
                          className="flex items-start space-x-3 p-2 rounded-lg hover:bg-navy-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={character.selected}
                            onChange={() => handleElementToggle('characters', character.id)}
                            className="mt-1 w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                          />
                          <div>
                            <p className="text-sm font-medium text-white">{character.name}</p>
                            <p className="text-xs text-gray-400">{character.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Locations */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-primary-400" />
                      <h3 className="font-medium text-white">Locations</h3>
                      <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
                        {getSelectedCount('locations')}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {selectedElements.locations.map(location => (
                        <label
                          key={location.id}
                          className="flex items-start space-x-3 p-2 rounded-lg hover:bg-navy-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={location.selected}
                            onChange={() => handleElementToggle('locations', location.id)}
                            className="mt-1 w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                          />
                          <div>
                            <p className="text-sm font-medium text-white">{location.name}</p>
                            <p className="text-xs text-gray-400">{location.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Style */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Palette className="w-4 h-4 text-primary-400" />
                      <h3 className="font-medium text-white">Style</h3>
                      <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
                        {getSelectedCount('style')}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {selectedElements.style.map(style => (
                        <label
                          key={style.id}
                          className="flex items-start space-x-3 p-2 rounded-lg hover:bg-navy-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={style.selected}
                            onChange={() => handleElementToggle('style', style.id)}
                            className="mt-1 w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                          />
                          <div>
                            <p className="text-sm font-medium text-white">{style.name}</p>
                            <p className="text-xs text-gray-400">{style.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Center Panel - Training Options (50%) */}
            <div className="lg:col-span-6">
              <Card>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Training Configuration
                </h2>
                
                <div className="space-y-6">
                  {/* Model Selection */}
                  <div className="border border-primary-500 bg-primary-500/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">Nano Banana Model</h3>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Optimized for anime-style character and scene generation
                    </p>
                  </div>

                  {/* Training Parameters */}
                  <div>
                    <button
                      onClick={() => setShowParameters(!showParameters)}
                      className="flex items-center justify-between w-full p-3 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors"
                    >
                      <span className="font-medium text-white">Training Parameters</span>
                      {showParameters ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {showParameters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-4 bg-navy-700 rounded-lg space-y-3"
                      >
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Epochs</label>
                            <input
                              type="number"
                              defaultValue={100}
                              className="w-full px-3 py-2 bg-navy-800 border border-navy-600 rounded text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Learning Rate</label>
                            <input
                              type="number"
                              step="0.001"
                              defaultValue={0.001}
                              className="w-full px-3 py-2 bg-navy-800 border border-navy-600 rounded text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Batch Size</label>
                            <input
                              type="number"
                              defaultValue={4}
                              className="w-full px-3 py-2 bg-navy-800 border border-navy-600 rounded text-white text-sm"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Start Training Button */}
                  <div className="pt-4">
                    <Button
                      size="lg"
                      onClick={handleStartTraining}
                      disabled={totalSelected === 0 || progress.isTraining}
                      className="w-full"
                    >
                      {progress.isTraining ? (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          Training in Progress...
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Start Training ({totalSelected} elements)
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Panel - Progress Tracker (25%) */}
            <div className="lg:col-span-3">
              <Card>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Training Progress
                </h2>
                
                {progress.isTraining ? (
                  <div className="space-y-4">
                    <ProgressBar
                      progress={progress.progress}
                      label="Overall Progress"
                    />
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Cpu className="w-4 h-4 text-primary-400" />
                        <span className="text-sm text-white">{progress.currentTask}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {Math.floor(progress.estimatedTime / 60)}m {progress.estimatedTime % 60}s remaining
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-white mb-2">Training Queue</h3>
                      <div className="space-y-1">
                        {progress.queue.map((task, index) => (
                          <div
                            key={index}
                            className="text-xs text-gray-400 p-2 bg-navy-700 rounded"
                          >
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : progress.progress === 100 ? (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                    <h3 className="text-lg font-semibold text-white">Training Complete!</h3>
                    <p className="text-gray-400 text-sm">
                      Your models are ready for review
                    </p>
                    <Button
                      onClick={handleApproveResults}
                      className="w-full"
                    >
                      Review Results
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Cpu className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Training not started</p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TrainingDashboard;
