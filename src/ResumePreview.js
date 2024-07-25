import React from 'react';

// Helper function to render points and sub-points
const renderPoints = (points) => {
  return points.map((point, index) => (
    <div key={index} className="resume-point">
      <p>{point.text}</p>
      {point.subPoints.length > 0 && (
        <ul className="sub-points">
          {point.subPoints.map((subPoint, subIndex) => (
            <li key={subIndex} className="sub-point">{subPoint}</li>
          ))}
        </ul>
      )}
    </div>
  ));
};

function ResumePreview({ sections }) {
  return (
    <div className="resume-preview">
      <h3>Resume Preview</h3>
      {sections.filter(section => section.visible).map((section, index) => (
        <div key={index}>
          <h4>{section.title}</h4>
          {renderPoints(section.points)}
        </div>
      ))}
    </div>
  );
}

export default ResumePreview;
