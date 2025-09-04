import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  ArrowRight, 
  Eye, 
  Trash2, 
  Edit, 
  MoreVertical,
  Banana,
  User,
  MapPin,
  Palette
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Header from '../common/Header';
import ProgressBar from '../ui/ProgressBar';
import { UserProfile } from '../../types';

interface TrainModelProps {
  user: UserProfile;
}

const TrainModel: React.FC<TrainModelProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(25);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop
  };

  const handleBrowseFiles = () => {
    // Handle file browse
  };

  const handleGenerateTrainingImages = () => {
    // Handle generate training images
  };

  const handleStartTraining = () => {
    navigate('/training-progress');
  };

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
              Train Your Model
            </h1>
            <p className="text-gray-400">
              Help Nano Banana learn your project's visual style
            </p>
          </section>

          {/* Training Options */}
          <section className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Option 1: Upload Reference Images */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-6">
                Option 1: Upload Reference Images
              </h2>
              
              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 mb-6
                  ${isDragOver 
                    ? 'border-primary-500 bg-primary-500/10' 
                    : 'border-navy-600 hover:border-navy-500'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <p className="text-white mb-2">Drag & drop images (JPG, PNG) or folders</p>
                <p className="text-gray-400 text-sm">or click to browse files</p>
              </div>
              
              <Button
                onClick={handleBrowseFiles}
                className="w-full mb-4"
              >
                <Upload className="w-5 h-5 mr-2" />
                Browse Files
              </Button>
              
              <ProgressBar
                progress={uploadProgress}
                label="Upload Progress"
              />
            </Card>

            {/* Option 2: Generate Training Images */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-6">
                Option 2: Generate Training Images
              </h2>
              
              <div className="space-y-4">
                {/* Character Selection */}
                <div className="flex items-center justify-between p-4 bg-navy-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Banana className="w-8 h-8 text-yellow-400" />
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">M</span>
                    </div>
                    <span className="text-white">Character: Maya</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Based on Character
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Training Images Source */}
                <div className="flex items-center justify-between p-4 bg-navy-700 rounded-lg">
                  <span className="text-white">Based on Location Training Images</span>
                  <Button size="sm" variant="outline">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Location and Style */}
                <div className="flex items-center justify-between p-4 bg-navy-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-400" />
                      <span className="text-white">Based on Location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="w-4 h-4 text-purple-400" />
                      <span className="text-white">Style Anime - Adventure</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleGenerateTrainingImages}
                  className="w-full"
                >
                  Generate Training Images
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>
          </section>

          {/* Training Progress (Optional) */}
          <section className="mb-12">
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
                        <Button onClick={handleStartTraining}>
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

export default TrainModel;
