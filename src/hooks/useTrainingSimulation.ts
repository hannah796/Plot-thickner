import { useState, useCallback, useEffect } from 'react';
import { TrainingProgress } from '../types';

interface UseTrainingSimulationReturn {
  progress: TrainingProgress;
  startTraining: () => void;
  stopTraining: () => void;
  resetTraining: () => void;
}

export const useTrainingSimulation = (): UseTrainingSimulationReturn => {
  const [progress, setProgress] = useState<TrainingProgress>({
    isTraining: false,
    progress: 0,
    currentTask: '',
    estimatedTime: 0,
    queue: []
  });

  const startTraining = useCallback(() => {
    setProgress({
      isTraining: true,
      progress: 0,
      currentTask: 'Initializing training...',
      estimatedTime: 300, // 5 minutes
      queue: [
        'Processing script elements',
        'Generating character models',
        'Creating location scenes',
        'Training style models',
        'Finalizing results'
      ]
    });
  }, []);

  const stopTraining = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      isTraining: false
    }));
  }, []);

  const resetTraining = useCallback(() => {
    setProgress({
      isTraining: false,
      progress: 0,
      currentTask: '',
      estimatedTime: 0,
      queue: []
    });
  }, []);

  useEffect(() => {
    if (!progress.isTraining) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev.progress >= 100) {
          return {
            ...prev,
            isTraining: false,
            currentTask: 'Training completed!',
            progress: 100
          };
        }

        const newProgress = prev.progress + Math.random() * 5;
        const taskIndex = Math.floor((newProgress / 100) * prev.queue.length);
        const currentTask = prev.queue[taskIndex] || 'Finalizing...';
        
        return {
          ...prev,
          progress: Math.min(newProgress, 100),
          currentTask,
          estimatedTime: Math.max(0, prev.estimatedTime - 1)
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [progress.isTraining]);

  return {
    progress,
    startTraining,
    stopTraining,
    resetTraining
  };
};
