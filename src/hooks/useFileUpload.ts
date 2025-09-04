import { useState, useCallback } from 'react';

interface UseFileUploadReturn {
  file: File | null;
  isUploading: boolean;
  progress: number;
  error: string | null;
  uploadFile: (file: File) => Promise<void>;
  clearFile: () => void;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (selectedFile: File) => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate file upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(i);
      }

      setFile(selectedFile);
    } catch (err) {
      setError('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
    setProgress(0);
    setError(null);
  }, []);

  return {
    file,
    isUploading,
    progress,
    error,
    uploadFile,
    clearFile
  };
};
