import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ThumbsUp, 
  Trash2, 
  ArrowRight, 
  Eye, 
  Edit, 
  MoreVertical,
  Wand2
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Header from '../common/Header';
import Input from '../ui/Input';
import { UserProfile } from '../../types';

interface ProjectShotsProps {
  user: UserProfile;
}

const ProjectShots: React.FC<ProjectShotsProps> = ({ user }) => {
  const navigate = useNavigate();
  const [selectedShots, setSelectedShots] = useState<string[]>([]);
  const [shotPrompt, setShotPrompt] = useState('overokoing village, Kaoks looks setting sun...');
  const [upscaleFactor, setUpscaleFactor] = useState('');

  const handleShotSelect = (shotId: string) => {
    setSelectedShots(prev => 
      prev.includes(shotId) 
        ? prev.filter(id => id !== shotId)
        : [...prev, shotId]
    );
  };

  const handleGenerateShots = () => {
    // Handle generate shots
  };

  const handleTrainLoRA = () => {
    // Handle train LoRA model
  };

  const handleUpscaleShots = () => {
    // Handle upscale shots
  };

  const handleContinue = () => {
    navigate('/');
  };

  const generatedShots = [
    { id: '1', name: 'Character 1 Mayn', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face' },
    { id: '2', name: 'Character 1 Kalen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { id: '3', name: 'Wiemng Maya', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { id: '4', name: 'Winisl paring Woods', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop' }
  ];

  const shotResults = [
    { id: '5', name: 'Character 1. Maya', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face' },
    { id: '6', name: 'Character 1. Katurs', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { id: '7', name: 'Character 1. Maya', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { id: '8', name: 'Character Maye', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' }
  ];

  const upscaleShots = [
    { id: '9', name: 'Vherecter 1 Kalen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { id: '10', name: 'Arinrecter 1. Maya', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face' },
    { id: '11', name: 'Cheractert. Maye', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' }
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      <Header user={user} />
      
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <section className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              Project Shots & Upscale
            </h1>
            <p className="text-gray-400">
              Generate and refine your project's final visual assets
            </p>
          </section>

          {/* Generate Shots Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Generate Shots using Nano Banana
            </h2>
            
            <div className="flex space-x-4 mb-6">
              <Input
                value={shotPrompt}
                onChange={setShotPrompt}
                placeholder="Shot Description / Prompt"
                className="flex-1"
              />
              <Button onClick={handleGenerateShots}>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Shots
              </Button>
            </div>

            {/* Generated Shots Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {generatedShots.map((shot, index) => (
                <motion.div
                  key={shot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="p-0 overflow-hidden">
                    <div className="aspect-square bg-navy-700 relative">
                      <img
                        src={shot.image}
                        alt={shot.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedShots.includes(shot.id)}
                          onChange={() => handleShotSelect(shot.id)}
                          className="w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                        />
                      </div>
                      
                      {/* Like Button */}
                      <div className="absolute bottom-2 right-2">
                        <button className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                          <ThumbsUp className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <p className="text-white text-sm font-medium truncate">
                        {shot.name}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Shot Generation Results */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Shot Generation Results
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {shotResults.map((shot, index) => (
                <motion.div
                  key={shot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="p-0 overflow-hidden">
                    <div className="aspect-square bg-navy-700 relative">
                      <img
                        src={shot.image}
                        alt={shot.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedShots.includes(shot.id)}
                          onChange={() => handleShotSelect(shot.id)}
                          className="w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                        />
                      </div>
                      
                      {/* Like Button */}
                      <div className="absolute bottom-2 right-2">
                        <button className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                          <ThumbsUp className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <p className="text-white text-sm font-medium truncate">
                        {shot.name}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Upscale & Refine Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Upscale & Refine with LoRA Mods
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {upscaleShots.map((shot, index) => (
                <motion.div
                  key={shot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="p-0 overflow-hidden">
                    <div className="aspect-square bg-navy-700 relative">
                      <img
                        src={shot.image}
                        alt={shot.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedShots.includes(shot.id)}
                          onChange={() => handleShotSelect(shot.id)}
                          className="w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <p className="text-white text-sm font-medium truncate">
                        {shot.name}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button onClick={handleTrainLoRA}>
                Train LoRA Model
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-white">Upscale Factor:</span>
                <Input
                  value={upscaleFactor}
                  onChange={setUpscaleFactor}
                  placeholder="2x, 4x"
                  className="w-24"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={handleUpscaleShots}
                className="px-6"
              >
                Upscale Selected Shots 2x, 4x
              </Button>
            </div>
          </section>

          {/* Training Progress (Optional) */}
          <section>
            <Card>
              <h2 className="text-xl font-semibold text-white mb-6">
                Training Progress (Optional)
              </h2>
              
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-navy-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                      />
                      <div className="flex items-center space-x-3">
                        {index === 0 ? (
                          <span className="text-white">Allow new</span>
                        ) : (
                          <>
                            <div className="w-8 h-8 bg-navy-600 rounded"></div>
                            <div>
                              <p className="text-white">Show name</p>
                              <p className="text-gray-400 text-sm">8 episodes</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400">
                        <Edit className="w-4 h-4" />
                      </button>
                      {index === 2 ? (
                        <Button onClick={handleContinue}>
                          Continue
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Episodes
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectShots;
