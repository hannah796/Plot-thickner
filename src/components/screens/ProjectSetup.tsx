import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import FileUpload from '../ui/FileUpload';
import Header from '../common/Header';
import { useFileUpload } from '../../hooks/useFileUpload';
import { UserProfile } from '../../types';

interface ProjectSetupProps {
  user: UserProfile;
}

const ProjectSetup: React.FC<ProjectSetupProps> = ({ user }) => {
  const navigate = useNavigate();
  const { file, isUploading, progress, uploadFile } = useFileUpload();
  const [projectTitle, setProjectTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileSelect = async (selectedFile: File) => {
    await uploadFile(selectedFile);
    
    // Simulate script analysis
    if (selectedFile) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  const handleContinue = () => {
    if (file && projectTitle.trim()) {
      navigate('/training');
    }
  };

  const canContinue = file && projectTitle.trim() && analysisComplete;

  return (
    <div className="min-h-screen bg-navy-900">
      <Header user={user} currentStep={1} totalSteps={3} />
      
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Create New Project
            </h1>
            <p className="text-gray-400">
              Upload your script and let AI analyze the key elements
            </p>
          </div>

          <div className="space-y-8">
            {/* Project Title */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                1. Project Details
              </h2>
              <Input
                label="Project Title"
                placeholder="Enter your project name..."
                value={projectTitle}
                onChange={setProjectTitle}
                className="text-lg"
              />
            </Card>

            {/* Script Upload */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                2. Upload Script
              </h2>
              <FileUpload
                onFileSelect={handleFileSelect}
                acceptedTypes=".pdf,.doc,.docx,.txt"
                maxSize={10}
              />
              
              {isUploading && (
                <motion.div
                  className="mt-4 p-4 bg-navy-700 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-white">Uploading... {Math.round(progress)}%</span>
                  </div>
                </motion.div>
              )}
            </Card>

            {/* Auto Summary */}
            {analysisComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h2 className="text-xl font-semibold text-white">
                      Script Analysis Complete
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-navy-700 rounded-lg p-4">
                      <h3 className="font-semibold text-white mb-2">Characters</h3>
                      <p className="text-2xl font-bold text-primary-400">3</p>
                      <p className="text-sm text-gray-400">Main characters identified</p>
                    </div>
                    
                    <div className="bg-navy-700 rounded-lg p-4">
                      <h3 className="font-semibold text-white mb-2">Locations</h3>
                      <p className="text-2xl font-bold text-primary-400">2</p>
                      <p className="text-sm text-gray-400">Key locations found</p>
                    </div>
                    
                    <div className="bg-navy-700 rounded-lg p-4">
                      <h3 className="font-semibold text-white mb-2">Style</h3>
                      <p className="text-2xl font-bold text-primary-400">1</p>
                      <p className="text-sm text-gray-400">Visual style detected</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Model Selection */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                3. AI Model Selection
              </h2>
              
              <div className="space-y-4">
                <div className="border border-primary-500 bg-primary-500/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">Nano Banana</h3>
                      <p className="text-gray-400">Recommended for anime-style projects</p>
                    </div>
                    <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="border border-navy-600 bg-navy-700 rounded-lg p-4 opacity-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">Custom Model</h3>
                      <p className="text-gray-400">Upload your own training data</p>
                    </div>
                    <div className="w-4 h-4 border border-navy-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Continue Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleContinue}
                disabled={!canContinue}
                className="px-8 py-3"
              >
                Continue to Training
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectSetup;
