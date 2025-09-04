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
  Banana
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Header from '../common/Header';
import ProgressBar from '../ui/ProgressBar';
import { UserProfile } from '../../types';

interface TrainingProgressProps {
  user: UserProfile;
}

const TrainingProgress: React.FC<TrainingProgressProps> = ({ user }) => {
  const navigate = useNavigate();
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);

  const handleSampleSelect = (sampleId: string) => {
    setSelectedSamples(prev => 
      prev.includes(sampleId) 
        ? prev.filter(id => id !== sampleId)
        : [...prev, sampleId]
    );
  };

  const handleApproveAndContinue = () => {
    navigate('/project-shots');
  };

  const handleTrainMore = () => {
    // Handle train more
  };

  const generatedSamples = [
    { id: '1', name: 'Character 1. Maya', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face' },
    { id: '2', name: 'Character 1. Msya', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { id: '3', name: 'Character: Kaelen', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { id: '4', name: 'Character 1. Rayn', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
    { id: '5', name: 'Character: Ketien', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
    { id: '6', name: 'Anime-Mode', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop' },
    { id: '7', name: 'Whispering Woods', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop' },
    { id: '8', name: 'Wisreang Monroirs', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop' },
    { id: '9', name: 'Character 1. Maya', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face' },
    { id: '10', name: 'Character: Kaelen', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { id: '11', name: 'Anime-Mode', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop' },
    { id: '12', name: 'Whispering Woods', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop' }
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
          {/* Training in Progress Section */}
          <section className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              Training in Progress
            </h1>
            <p className="text-gray-400 mb-8">
              Nano Banana is learning your project's style
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Applying final weights...</span>
                <span className="text-white font-medium">99% Status</span>
              </div>
              
              <ProgressBar
                progress={99}
                className="mb-4"
              />
              
              <div className="flex items-center justify-center space-x-4">
                <span className="text-gray-400">Status complete...</span>
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Banana className="w-8 h-8 text-yellow-800" />
                </div>
              </div>
            </div>
          </section>

          {/* Review Generated Samples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Review Generated Samples
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {generatedSamples.map((sample, index) => (
                <motion.div
                  key={sample.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="p-0 overflow-hidden">
                    <div className="aspect-square bg-navy-700 relative">
                      <img
                        src={sample.image}
                        alt={sample.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedSamples.includes(sample.id)}
                          onChange={() => handleSampleSelect(sample.id)}
                          className="w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                        />
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute bottom-2 right-2 flex space-x-1">
                        <button className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                          <ThumbsUp className="w-3 h-3 text-white" />
                        </button>
                        <button className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                          <Trash2 className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <p className="text-white text-sm font-medium truncate">
                        {sample.name}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={handleTrainMore}
                className="px-8 py-3"
              >
                Train More
              </Button>
              <Button
                onClick={handleApproveAndContinue}
                className="px-8 py-3"
              >
                Approve & Continue
                <ArrowRight className="w-5 h-5 ml-2" />
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
                        <Button onClick={handleApproveAndContinue}>
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

export default TrainingProgress;
