import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from 'react-toastify'

const Modules = ({modules, onChange}) => {

 

  const addModule = () => {
    onChange([...modules, { moduleTitle: '', sessions: [] }]);
  };

  const addSession = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].sessions.push({ sessionTitle: '', notes: '' });
    onChange(updatedModules);
  };

  const updateModuleTitle = (moduleIndex, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].moduleTitle = value;
    onChange(updatedModules);
  };


  const updateSessionTitle = (moduleIndex, sessionIndex, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].sessions[sessionIndex].sessionTitle = value;
    onChange(updatedModules);
  };

  const updateSessionNotes = (moduleIndex, sessionIndex, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].sessions[sessionIndex].notes = value;
    onChange(updatedModules);
  };
  
  

  const renderSessionInputs = (moduleIndex) => {
    return modules[moduleIndex].sessions.map((session, sessionIndex) => (
      <div key={sessionIndex} className="session">
        <Row>
        <Form.Group as={Col} md={'4'} controlId={`sessionTitle-${moduleIndex}-${sessionIndex}`}>
          <Form.Label>Session Title</Form.Label>
          <Form.Control
            type="text"
            value={session.sessionTitle}
            onChange={(e) =>
              updateSessionTitle(moduleIndex, sessionIndex, e.target.value)
            }
          />
        </Form.Group>
        <Form.Group as={Col} md={'8'} controlId={`sessionNotes-${moduleIndex}-${sessionIndex}`}>
          <Form.Label>Session Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={session.notes}
            onChange={(e) =>
              updateSessionNotes(moduleIndex, sessionIndex, e.target.value)
            }
          />
        </Form.Group>
        </Row>
      </div>
    ));
  };
  

  return (
    <>
      {modules.map((module, moduleIndex) => (
        <div key={moduleIndex} className="module">
          <Form.Group controlId={`moduleTitle-${moduleIndex}`}>
            <Form.Control
              type="text"
              value={module.moduleTitle}
              placeholder='Module Title'
              onChange={(e) => updateModuleTitle(moduleIndex, e.target.value)}
            />
          </Form.Group>
          <h4>Sessions</h4>
          {renderSessionInputs(moduleIndex)}
          <Button
            variant="outline-secondary"
            onClick={() => addSession(moduleIndex)}
          >
            Add Session
          </Button>
        </div>
      ))}
      <Button variant="outline-primary" className='mt-5' onClick={addModule}>
        Add Module
      </Button>
    </>
  );
};

export default Modules;
