import React, { useState } from 'react';
import SectionManager from './SectionManager';
import SectionEditor from './SectionEditor';
import ResumePreview from './ResumePreview';
import './styles.css'; // Ensure this CSS file is imported

function ResumeEditor({ resume, updateResume }) {
  const [selectedSection, setSelectedSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSectionChange = (sections) => {
    updateResume({...resume, sections });
  };

  const handleSectionEdit = (section) => {
    setSelectedSection(section);
    setIsEditing(true);
  };

  const handleSectionUpdate = (updatedSection) => {
    const sections = resume.sections.map(s => s.id === updatedSection.id? updatedSection : s);
    handleSectionChange(sections);
    setIsEditing(false);
  };

  const handleSectionAdd = () => {
    const newSection = { id: Date.now(), title: 'New Section', points: [] };
    handleSectionChange([...resume.sections, newSection]);
  };

  const handleSectionDelete = (sectionId) => {
    const sections = resume.sections.filter(s => s.id!== sectionId);
    handleSectionChange(sections);
  };

  return (
    <div className="resume-editor-container">
      <div className="resume-editor-left">
        <SectionManager
          sections={resume.sections}
          onChange={handleSectionChange}
          onEdit={handleSectionEdit}
          onDelete={handleSectionDelete}
          onAdd={handleSectionAdd}
        />
      </div>
      <div className="resume-editor-right">
        {isEditing && (
          <SectionEditor section={selectedSection} onUpdate={handleSectionUpdate} />
        )}
        <ResumePreview sections={resume.sections} />
      </div>
    </div>
  );
}

export default ResumeEditor;