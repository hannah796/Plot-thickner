import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  X, 
  Eye, 
  Trash2, 
  Edit, 
  MoreVertical,
  Info,
  Cloud
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Header from '../common/Header';
import { UserProfile } from '../../types';

interface ScriptUploadProps {
  user: UserProfile;
}

const ScriptUpload: React.FC<ScriptUploadProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'shows' | 'models'>('shows');

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
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleContinue = () => {
    if (selectedFile) {
      navigate('/script-analysis');
    }
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
          {/* Script Upload Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                Script Upload
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Upload your recent film project to extract characters, characteristics, locations, and styles
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {!selectedFile ? (
                <motion.div
                  className={`
                    border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200
                    ${isDragOver 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-navy-600 hover:border-navy-500'
                    }
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload className="w-16 h-16 text-primary-400 mx-auto mb-6" />
                  <h3 className="text-xl font-medium text-white mb-2">
                    Drag & drop script file (PDF, TXT, DOCX)
                  </h3>
                  <p className="text-gray-400 mb-6">
                    or click to browse files
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.txt,.docx"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer transition-colors duration-200"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Browse Files
                  </label>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-navy-800 border border-navy-600 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-12 h-12 text-primary-400" />
                      <div>
                        <p className="text-white font-medium text-lg">{selectedFile.name}</p>
                        <p className="text-gray-400">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={handleContinue}
                        className="px-6 py-3"
                      >
                        Continue
                      </Button>
                      <button
                        onClick={removeFile}
                        className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Cloud Storage Options */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 mb-4">Upload from Cloud Storage</p>
                <div className="flex items-center justify-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors">
                    <Cloud className="w-5 h-5 text-blue-400" />
                    <span className="text-white">Google Drive</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors">
                    <Cloud className="w-5 h-5 text-blue-500" />
                    <span className="text-white">Dropbox</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <section>
            <div className="flex space-x-8 mb-6">
              <button
                onClick={() => setActiveTab('shows')}
                className={`text-lg font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === 'shows'
                    ? 'text-white border-primary-500'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                All Shows
              </button>
              <button
                onClick={() => setActiveTab('models')}
                className={`text-lg font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === 'models'
                    ? 'text-white border-primary-500'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                Models
              </button>
            </div>

            {/* Shows Tab Content */}
            {activeTab === 'shows' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-white">Shows</h3>
                    <span className="bg-primary-500 text-white text-sm px-3 py-1 rounded-full">
                      24 shows
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Shows Table */}
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-4 py-3 text-sm text-gray-400 border-b border-navy-700">
                    <div className="col-span-1"></div>
                    <div className="col-span-6">Show name</div>
                    <div className="col-span-2">Episodes</div>
                    <div className="col-span-3"></div>
                  </div>
                  
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 py-3 items-center hover:bg-navy-800 rounded-lg transition-colors">
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                        />
                      </div>
                      <div className="col-span-6">
                        <span className="text-white">Show name</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-400">8 episodes</span>
                      </div>
                      <div className="col-span-3 flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-blue-400">
                          <Edit className="w-4 h-4" />
                        </button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Episodes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Models Tab Content */}
            {activeTab === 'models' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Models</h3>
                <div className="text-center py-12 text-gray-400">
                  <p>No models available yet</p>
                  <p className="text-sm mt-2">Create your first show to start training models</p>
                </div>
              </div>
            )}
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default ScriptUpload;
