import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

function ResumeList({ resumes, setCurrentResumeId, addResume, deleteResume, renameResume }) {
  const [editingResumeId, setEditingResumeId] = React.useState(null);
  const [newName, setNewName] = React.useState('');

  const startEditing = (resumeId) => {
    setEditingResumeId(resumeId);
    const resume = resumes.find(r => r.id === resumeId);
    setNewName(resume ? resume.name : '');
  };

  const handleRename = (resumeId) => {
    renameResume(resumeId, newName);
    setEditingResumeId(null);
  };

  return (
    <div className="resume-list">
      <h2>My Resumes</h2>
      <ul>
        {resumes.map(resume => (
          <li key={resume.id}>
            {editingResumeId === resume.id ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={() => handleRename(resume.id)}>
                  <FontAwesomeIcon icon={faSave} className="icon" />
                </button>
                <button onClick={() => setEditingResumeId(null)}>
                  <FontAwesomeIcon icon={faTimes} className="icon" />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span onClick={() => setCurrentResumeId(resume.id)}>{resume.name}</span>
                <div>
                  <button onClick={() => startEditing(resume.id)}>
                    <FontAwesomeIcon icon={faEdit} className="icon" />
                  </button>
                  <button onClick={() => deleteResume(resume.id)}>
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResumeList;
