import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Trash2, Edit, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Header from '../common/Header';
import { UserProfile, Project } from '../../types';

interface LandingPageProps {
  user: UserProfile;
  recentProjects: Project[];
}

const LandingPage: React.FC<LandingPageProps> = ({ user, recentProjects }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'shows' | 'models'>('shows');

  const handleCreateProject = () => {
    navigate('/script-upload');
  };

  const handleOpenProject = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <Header user={user} />
      
      <motion.main
        className="container mx-auto px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.h1
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Plot Thickener
          </motion.h1>
          
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Start a new film project with AI-powered characters, locations, and styles
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              onClick={handleCreateProject}
              className="text-lg px-8 py-4"
            >
              <Plus className="w-6 h-6 mr-2" />
              Create Show
            </Button>
          </motion.div>
        </motion.section>

        {/* Recent Shows */}
        <motion.section variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Shows</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProjects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  hover
                  onClick={() => handleOpenProject(project.id)}
                  className="p-0 overflow-hidden"
                >
                  <div className="aspect-video bg-navy-700 relative">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-gray-500">No thumbnail</div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">Show Name</h3>
                    <p className="text-sm text-gray-400 mb-2">Lorem ipsum dolor sit amet</p>
                    <p className="text-xs text-gray-500 mb-3">2 episodes</p>
                    <Button size="sm" variant="outline" className="w-full">
                      + Continue editing
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.section variants={itemVariants}>
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
        </motion.section>
      </motion.main>
    </div>
  );
};

export default LandingPage;
