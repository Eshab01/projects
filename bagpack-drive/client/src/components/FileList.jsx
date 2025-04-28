import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FileList.css';

const FileList = ({ files, isLoading, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (file) => {
    const shareUrl = file.shareUrl || file.downloadUrl;
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert("Share link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy link:", err));
  };

  // Filter files based on search term
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort files based on sort criteria
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'type') {
      comparison = a.type.localeCompare(b.type);
    } else if (sortBy === 'size') {
      const sizeA = parseFloat(a.size);
      const sizeB = parseFloat(b.size);
      comparison = sizeA - sizeB;
    } else if (sortBy === 'updated') {
      comparison = new Date(a.updated) - new Date(b.updated);
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return '📄';
      case 'image': case 'jpg': case 'png': case 'gif': return '🖼️';
      case 'spreadsheet': case 'xlsx': case 'csv': return '📊';
      case 'presentation': case 'pptx': return '📑';
      case 'doc': case 'docx': return '📝';
      default: return '📁';
    }
  };

  // Format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="file-list-container">
      <div className="file-list-header">
        <h2>Your Files</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {isLoading ? (
        <div className="file-list-loading">
          <div className="file-loading-animation">
            <div className="bouncing-file"></div>
            <div className="bouncing-file delay-1"></div>
            <div className="bouncing-file delay-2"></div>
          </div>
          <p>Loading your files...</p>
        </div>
      ) : (
        <>
          {sortedFiles.length === 0 ? (
            <div className="no-files">
              <div className="empty-illustration">📂</div>
              <p>No files found{searchTerm ? ' matching "' + searchTerm + '"' : ''}.</p>
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="file-table-container">
              <table className="file-table">
                <thead>
                  <tr>
                    <th className="file-icon-column"></th>
                    <th className={`sortable ${sortBy === 'name' ? 'sorted' : ''}`} onClick={() => handleSortChange('name')}>
                      Name
                      {sortBy === 'name' && (
                        <span className="sort-indicator">
                          {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                        </span>
                      )}
                    </th>
                    <th className={`sortable ${sortBy === 'type' ? 'sorted' : ''}`} onClick={() => handleSortChange('type')}>
                      Type
                      {sortBy === 'type' && (
                        <span className="sort-indicator">
                          {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                        </span>
                      )}
                    </th>
                    <th className={`sortable ${sortBy === 'size' ? 'sorted' : ''}`} onClick={() => handleSortChange('size')}>
                      Size
                      {sortBy === 'size' && (
                        <span className="sort-indicator">
                          {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                        </span>
                      )}
                    </th>
                    <th className={`sortable ${sortBy === 'updated' ? 'sorted' : ''}`} onClick={() => handleSortChange('updated')}>
                      Last Updated
                      {sortBy === 'updated' && (
                        <span className="sort-indicator">
                          {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                        </span>
                      )}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <AnimatePresence>
                  <tbody>
                    {sortedFiles.map((file) => (
                      <motion.tr key={file.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <td>{getFileIcon(file.type)}</td>
                        <td>{file.name}</td>
                        <td>{file.type}</td>
                        <td>{file.size}</td>
                        <td>{formatDate(file.updated)}</td>
                        <td>
                          <div className="file-actions">
                            <button className="download-button" onClick={() => handleDownload(file)}>⬇️</button>
                            <button className="share-button" onClick={() => handleShare(file)}>🔗</button>
                            <button className="delete-button" onClick={() => handleDelete(file.id)}>🗑️</button>
                          </div>
                        </td>

                      </motion.tr>
                    ))}
                  </tbody>
                </AnimatePresence>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileList;
