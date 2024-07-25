import React, { useState, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

function SectionEditor({ section, onUpdate }) {
  const [newPoint, setNewPoint] = useState('');
  const [newSubPoint, setNewSubPoint] = useState('');
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [points, setPoints] = useState(section.points);

  useEffect(() => {
    setPoints(section.points);
  }, [section]);

  const handleAddPoint = () => {
    const updatedPoints = [...points, { text: newPoint, subPoints: [] }];
    setPoints(updatedPoints);
    setNewPoint('');
    onUpdate({ ...section, points: updatedPoints });
  };

  const handleAddSubPoint = () => {
    const updatedPoints = [...points];
    if (selectedPointIndex !== null) {
      updatedPoints[selectedPointIndex].subPoints.push(newSubPoint);
      setPoints(updatedPoints);
      setNewSubPoint('');
      onUpdate({ ...section, points: updatedPoints });
    }
  };

  const handlePointChange = (index, event) => {
    const updatedPoints = [...points];
    updatedPoints[index].text = event.target.value;
    setPoints(updatedPoints);
    onUpdate({ ...section, points: updatedPoints });
  };

  const handleSubPointChange = (pointIndex, subIndex, event) => {
    const updatedPoints = [...points];
    updatedPoints[pointIndex].subPoints[subIndex] = event.target.value;
    setPoints(updatedPoints);
    onUpdate({ ...section, points: updatedPoints });
  };

  return (
    <div className="section-editor">
      <h3>Edit Section: {section.title}</h3>
      <div>
        <input
          type="text"
          value={newPoint}
          onChange={(e) => setNewPoint(e.target.value)}
          placeholder="New Point"
        />
        <button onClick={handleAddPoint}>Add Point</button>
      </div>
      <Droppable droppableId="droppable-points" type="POINT">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {points.map((point, index) => (
              <Draggable key={index} draggableId={`draggable-point-${index}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="point-container"
                  >
                    <input
                      type="text"
                      value={point.text}
                      onChange={(e) => handlePointChange(index, e)}
                      placeholder="Point"
                    />
                    <button onClick={() => setSelectedPointIndex(index)}>Add Sub-Point</button>
                    {selectedPointIndex === index && (
                      <div>
                        <input
                          type="text"
                          value={newSubPoint}
                          onChange={(e) => setNewSubPoint(e.target.value)}
                          placeholder="New Sub-Point"
                        />
                        <button onClick={handleAddSubPoint}>Add Sub-Point</button>
                      </div>
                    )}
                    {point.subPoints.length > 0 && (
                      <Droppable droppableId={`droppable-subpoints-${index}`} type="SUBPOINT">
                        {(provided) => (
                          <ul className="sub-points" ref={provided.innerRef} {...provided.droppableProps}>
                            {point.subPoints.map((subPoint, subIndex) => (
                              <Draggable key={subIndex} draggableId={`draggable-subpoint-${index}-${subIndex}`} index={subIndex}>
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="sub-point"
                                  >
                                    <input
                                      type="text"
                                      value={subPoint}
                                      onChange={(e) => handleSubPointChange(index, subIndex, e)}
                                      placeholder="Sub-Point"
                                    />
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default SectionEditor;
