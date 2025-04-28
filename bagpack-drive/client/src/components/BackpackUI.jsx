// File: src/components/BackpackUI.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/BackpackUI.css';

const BackpackUI = ({ isOpen, toggleBackpack, onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!isOpen) toggleBackpack();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };
  
  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Simulate completion
          setTimeout(() => {
            onFileUpload(files);
            setIsUploading(false);
            setUploadProgress(0);
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  };
  
  const handleButtonClick = () => {
    if (isOpen) {
      fileInputRef.current.click();
    } else {
      toggleBackpack();
    }
  };
  
  return (
    <div 
      className="backpack-container"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileInputChange} 
        style={{ display: 'none' }} 
        multiple
      />
      
      <AnimatePresence>
        {isDragging && (
          <motion.div 
            className="drop-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="drop-message">
              <i className="drop-icon">📁</i>
              <span>Drop files to add to your backpack</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="backpack-wrapper">
        <motion.div 
          className={`backpack ${isOpen ? 'open' : 'closed'}`}
          animate={{ scale: isDragging ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="backpack-top"></div>
          
          <div className="backpack-front">
            {isOpen && (
              <motion.div 
                className="backpack-contents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {isUploading ? (
                  <div className="upload-progress-container">
                    <div className="upload-progress-bar">
                      <div 
                        className="upload-progress-fill"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <span className="upload-progress-text">
                      Uploading... {Math.round(uploadProgress)}%
                    </span>
                  </div>
                ) : (
                  <div className="upload-prompt">
                    <p>Drag files here or click to upload</p>
                    <i className="upload-icon">⬆️</i>
                  </div>
                )}
              </motion.div>
            )}
          </div>
          
          <div className="backpack-pocket"></div>
          <div className="backpack-strap left"></div>
          <div className="backpack-strap right"></div>
        </motion.div>
        
        <motion.button 
          className="backpack-action-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleButtonClick}
        >
          {isOpen ? 'Add Files' : 'Open Backpack'}
        </motion.button>
      </div>
    </div>
  );
};

export default BackpackUI;