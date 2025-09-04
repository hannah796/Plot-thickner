import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  X, 
  RotateCcw, 
  Download, 
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Header from '../common/Header';
import { mockTrainingResults } from '../../utils/mockData';
import { TrainingResult, UserProfile } from '../../types';

interface ResultsApprovalProps {
  user: UserProfile;
}

const ResultsApproval: React.FC<ResultsApprovalProps> = ({ user }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState<TrainingResult[]>(mockTrainingResults);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setResults(prev => prev.map(result => 
      result.id === id ? { ...result, approved: true } : result
    ));
  };

  const handleReject = (id: string) => {
    setResults(prev => prev.map(result => 
      result.id === id ? { ...result, approved: false } : result
    ));
  };

  const handleBatchApprove = () => {
    setResults(prev => prev.map(result => 
      selectedItems.includes(result.id) ? { ...result, approved: true } : result
    ));
    setSelectedItems([]);
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === results.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(results.map(result => result.id));
    }
  };

  const handleFinish = () => {
    // Navigate to success page or back to landing
    navigate('/');
  };

  const approvedCount = results.filter(r => r.approved).length;
  const totalCount = results.length;
  const allApproved = approvedCount === totalCount;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'character':
        return '👤';
      case 'location':
        return '📍';
      case 'style':
        return '🎨';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'character':
        return 'text-blue-400';
      case 'location':
        return 'text-green-400';
      case 'style':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <Header user={user} currentStep={3} totalSteps={3} />
      
      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Training Results
            </h1>
            <p className="text-gray-400">
              Review and approve your generated assets
            </p>
          </div>

          {/* Progress Summary */}
          <Card className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-white font-medium">
                    {approvedCount} of {totalCount} approved
                  </span>
                </div>
                <div className="w-32 bg-navy-700 rounded-full h-2">
                  <motion.div
                    className="h-full bg-green-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(approvedCount / totalCount) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {selectedItems.length === results.length ? 'Deselect All' : 'Select All'}
                </Button>
                <Button
                  size="sm"
                  onClick={handleBatchApprove}
                  disabled={selectedItems.length === 0}
                >
                  Approve Selected ({selectedItems.length})
                </Button>
              </div>
            </div>
          </Card>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`relative overflow-hidden ${
                    result.approved ? 'ring-2 ring-green-400' : ''
                  } ${selectedItems.includes(result.id) ? 'ring-2 ring-primary-400' : ''}`}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(result.id)}
                      onChange={() => handleSelectItem(result.id)}
                      className="w-4 h-4 text-primary-500 bg-navy-700 border-navy-600 rounded focus:ring-primary-500"
                    />
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-xs px-2 py-1 rounded-full bg-navy-800 ${getTypeColor(result.type)}`}>
                      {getTypeIcon(result.type)} {result.type}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="aspect-square bg-navy-700 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                      onClick={() => setShowModal(result.id)}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-white">{result.name}</h3>
                      <p className="text-sm text-gray-400">
                        Confidence: {Math.round(result.confidence * 100)}%
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {result.approved ? (
                        <div className="flex items-center space-x-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Approved</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(result.id)}
                            className="flex-1"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(result.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Final Actions */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/training')}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retrain Models
            </Button>
            
            <Button
              size="lg"
              onClick={handleFinish}
              disabled={!allApproved}
              className="px-8"
            >
              {allApproved ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete Project
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Approve All to Continue
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Image Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowModal(null)}
        >
          <motion.div
            className="max-w-2xl max-h-[90vh] bg-navy-800 rounded-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const result = results.find(r => r.id === showModal);
              if (!result) return null;
              
              return (
                <>
                  <div className="p-4 border-b border-navy-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">{result.name}</h3>
                      <button
                        onClick={() => setShowModal(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-auto rounded-lg"
                    />
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm ${getTypeColor(result.type)}`}>
                          {getTypeIcon(result.type)} {result.type}
                        </span>
                        <span className="text-sm text-gray-400">
                          Confidence: {Math.round(result.confidence * 100)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        {!result.approved && (
                          <Button
                            size="sm"
                            onClick={() => {
                              handleApprove(result.id);
                              setShowModal(null);
                            }}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ResultsApproval;
