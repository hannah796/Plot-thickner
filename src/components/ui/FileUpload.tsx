import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = '.pdf,.doc,.docx,.txt',
  maxSize = 10,
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setError('');
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = acceptedTypes.split(',').map(type => type.trim());
    
    if (!acceptedExtensions.includes(fileExtension)) {
      setError(`File type not supported. Accepted types: ${acceptedTypes}`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  }, [maxSize, acceptedTypes, onFileSelect]);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setError('');
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      {!selectedFile ? (
        <motion.div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
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
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Drop your script here
          </h3>
          <p className="text-gray-400 mb-4">
            or click to browse files
          </p>
          <input
            type="file"
            accept={acceptedTypes}
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer transition-colors duration-200"
          >
            Browse Files
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Supports: {acceptedTypes} (max {maxSize}MB)
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="bg-navy-700 border border-navy-600 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-primary-400" />
              <div>
                <p className="text-white font-medium">{selectedFile.name}</p>
                <p className="text-gray-400 text-sm">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="text-gray-400 hover:text-red-400 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
      
      {error && (
        <motion.p
          className="text-red-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FileUpload;
