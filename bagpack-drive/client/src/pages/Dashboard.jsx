import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import BackpackUI from '../components/BackpackUI';
import FileList from '../components/FileList';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [isBackpackOpen, setIsBackpackOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching files from API
    setTimeout(() => {
      // Mock data
      const mockFiles = [
        { id: '1', name: 'Document.pdf', type: 'pdf', size: '2.4 MB', updated: '2023-11-20T15:32:00Z' },
        { id: '2', name: 'Image.jpg', type: 'image', size: '1.7 MB', updated: '2023-11-19T09:15:00Z' },
        { id: '3', name: 'Spreadsheet.xlsx', type: 'spreadsheet', size: '0.8 MB', updated: '2023-11-18T14:45:00Z' },
        { id: '4', name: 'Presentation.pptx', type: 'presentation', size: '3.5 MB', updated: '2023-11-17T11:20:00Z' },
      ];
      setFiles(mockFiles);
      setIsLoading(false);
    }, 1200);
  }, []);

  const handleFileUpload = (newFiles) => {
    console.log('Files to upload:', newFiles);
    
    const newUploadedFiles = Array.from(newFiles).map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.name.split('.').pop().toLowerCase(),
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      updated: new Date().toISOString()
    }));
    
    setFiles([...newUploadedFiles, ...files]);

    setTimeout(() => {
      setIsBackpackOpen(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      const updatedFiles = files.filter((file) => file.id !== id);
      setFiles(updatedFiles); // Update the state to remove the file
    }
  };

  const toggleBackpack = () => {
    setIsBackpackOpen(!isBackpackOpen);
  };

  return (
    <div className="dashboard">
      <Navbar user={user} logout={logout} />
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome, {user.username}!</h1>
          <p>Store and organize your files in your digital backpack</p>
        </div>
        
        <div className="main-section">
          <div className="backpack-section">
            <BackpackUI 
              isOpen={isBackpackOpen} 
              toggleBackpack={toggleBackpack}
              onFileUpload={handleFileUpload}
            />
          </div>

          <div className="files-section">
            <FileList 
              files={files} 
              isLoading={isLoading} 
              handleDelete={handleDelete} // Pass the handleDelete function as a prop
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
