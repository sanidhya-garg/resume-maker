import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function SectionManager({ sections, onChange, onEdit }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedSections = Array.from(sections);
    const [movedSection] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, movedSection);
    onChange(reorderedSections);
  };

  const toggleSectionVisibility = (sectionId) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    );
    onChange(updatedSections);
  };

  return (
    <div className="section-manager">
      <h3>Manage Sections</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="section-item"
                    >
                      <div>
                        <span>{section.title}</span>
                        <button onClick={() => toggleSectionVisibility(section.id)}>
                          {section.visible ? 'Hide' : 'Show'}
                        </button>
                        <button onClick={() => onEdit(section)}>Edit</button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default SectionManager;
