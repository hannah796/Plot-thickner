import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowRight, 
  Eye, 
  Trash2, 
  Edit, 
  MoreVertical
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Header from '../common/Header';
import { UserProfile } from '../../types';

interface ScriptAnalysisProps {
  user: UserProfile;
}

const ScriptAnalysis: React.FC<ScriptAnalysisProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/train-model');
  };

  const handleEdit = () => {
    // Handle edit functionality
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
              Script Analysis & Database Summary
            </h1>
            <p className="text-gray-400">
              Your script has successfully uploaded and processed
            </p>
          </section>

          {/* Analysis Results */}
          <section className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Characters Card */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">Characters</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-navy-700 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">M</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Character 1: Maya</p>
                    <p className="text-gray-400 text-sm">Protagonist</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-navy-700 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">K</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Character 2: Kaelen</p>
                    <p className="text-gray-400 text-sm">Wise Mentor</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Locations Card */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">Locations</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-navy-700 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🌲</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Location 1: Whispering Woods</p>
                    <p className="text-gray-400 text-sm">Ancient forest</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-navy-700 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🏘️</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Location 2: Cliffside Village</p>
                    <p className="text-gray-400 text-sm">Coastal settlement</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Detected Styles Card */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">Detected Styles</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-navy-700 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🎨</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Anime - Adventure</p>
                    <p className="text-gray-400 text-sm">Visual style</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-navy-700 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✨</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">Fantasy - High Magic</p>
                    <p className="text-gray-400 text-sm">Genre style</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Action Buttons */}
          <section className="flex justify-center space-x-4 mb-12">
            <Button
              variant="outline"
              onClick={handleEdit}
              className="px-8 py-3"
            >
              Edit & Refine
            </Button>
            <Button
              onClick={handleContinue}
              className="px-8 py-3"
            >
              Confirm & Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </section>

          {/* Shows List */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-white">Shows</h3>
                <span className="bg-gray-500 text-white text-sm px-3 py-1 rounded-full">
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
              
              {Array.from({ length: 5 }).map((_, index) => (
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
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default ScriptAnalysis;
