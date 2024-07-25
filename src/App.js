import React, { useState } from 'react';
import ResumeEditor from './ResumeEditor';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './styles.css';

const defaultSections = [
  { id: '1', title: 'Contact Information', visible: true, points: [{ text: 'Phone: 123-456-7890', subPoints: [] }] },
  { id: '2', title: 'Education', visible: true, points: [
    { text: 'Bachelor of Science in Computer Science', subPoints: ['GPA: 3.8', 'Graduated: 2020'] }
  ] },
  { id: '3', title: 'Experience', visible: true, points: [
    { text: 'Software Engineer at Tech Co.', subPoints: ['Developed web applications', 'Led a team of 5'] }
  ] },
  { id: '4', title: 'Skills', visible: true, points: [{ text: 'JavaScript', subPoints: [] }] },
  { id: '5', title: 'Certifications', visible: true, points: [{ text: 'Certified React Developer', subPoints: [] }] },
];

function App() {
  const [resumes, setResumes] = useState([]);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [renameResumeId, setRenameResumeId] = useState(null);
  const [newName, setNewName] = useState('');

  const addResume = () => {
    const newResume = { id: Date.now(), name: 'New Resume', sections: defaultSections };
    setResumes([...resumes, newResume]);
    setCurrentResumeId(newResume.id);
  };

  const deleteResume = (resumeId) => {
    setResumes(resumes.filter(resume => resume.id !== resumeId));
    if (currentResumeId === resumeId) {
      setCurrentResumeId(null);
    }
  };

  const renameResume = (resumeId, newName) => {
    setResumes(resumes.map(resume =>
      resume.id === resumeId ? { ...resume, name: newName } : resume
    ));
    setRenameResumeId(null);
    setNewName('');
  };

  const handleResumeSelect = (event) => {
    setCurrentResumeId(Number(event.target.value));
  };

  const handleRename = (resumeId) => {
    setRenameResumeId(resumeId);
    const resume = resumes.find(r => r.id === resumeId);
    setNewName(resume ? resume.name : '');
  };

  const handleDelete = (resumeId) => {
    deleteResume(resumeId);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newSections = [...resumes.find(r => r.id === currentResumeId).sections];
    const [removed] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, removed);

    setResumes(resumes.map(resume =>
      resume.id === currentResumeId ? { ...resume, sections: newSections } : resume
    ));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <nav>
          <select value={currentResumeId || ''} onChange={handleResumeSelect}>
            <option value="">-- Select a Resume --</option>
            {resumes.map(resume => (
              <option key={resume.id} value={resume.id}>
                {resume.name}
                <button onClick={() => handleRename(resume.id)}>Rename</button>
                <button onClick={() => handleDelete(resume.id)}>Delete</button>
              </option>
            ))}
          </select>
          {renameResumeId && (
            <div>
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <button onClick={() => renameResume(renameResumeId, newName)}>Save</button>
            </div>
          )}
          <button onClick={addResume}>Add Resume</button>
        </nav>
        <div className="resume-editor-container">
          {currentResumeId && (
            <ResumeEditor resume={resumes.find(resume => resume.id === currentResumeId)} />
          )}
        </div>
        {currentResumeId && (
          <Droppable droppableId="sections">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {resumes.find(r => r.id === currentResumeId).sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                                        {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h2>{section.title}</h2>
                        <ul>
                          {section.points.map((point, index) => (
                            <li key={index}>{point.text}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </div>
    </DragDropContext>
  );
}

export default App;