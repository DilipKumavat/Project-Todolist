import React, { useState } from "react";
import { Form, Button, Modal, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function TodoModal(props) {
  const [newItem, setnewItem] = useState(props.newItem);
  const {priorityObj} = props;
  const getValue = (evt) => {
    setnewItem(evt.target.value);
  };

  const [priority, setPriority] = useState(props.priority);
  const disableSaveButton = newItem.length > 0 && priority.length > 0;
  const priorityIcon = priority ? priorityObj.filter((obj)=>{return obj.key === priority})[0]: null;

  const saveTodo = (evt) => {
    props.addItem(newItem, priority);
    setnewItem("");
    setPriority("");
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
    
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="mr-0">
          <Dropdown onSelect={(ekey, evt) => setPriority(ekey)} required>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Priority
            </Dropdown.Toggle>

            <Dropdown.Menu >
                {priorityObj.map((obj,index)=>{
                return <Dropdown.Item eventKey={obj.key} key={`${obj.key}_${index}`}>
                    <FontAwesomeIcon icon={obj.icon} style={{ color: obj.color }} />{" "}
                    {obj.text}
                </Dropdown.Item>
                })}
            </Dropdown.Menu>
          </Dropdown>
          {priority ?<FontAwesomeIcon icon={priorityIcon["icon"]} style={{color:priorityIcon["color"]}}/>:null}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          id="task"
          value={newItem}
          onChange={getValue}
          placeholder="Add New Todo"
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={saveTodo}
          disabled={!disableSaveButton}
        >
          Save changes
        </Button>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TodoModal;
