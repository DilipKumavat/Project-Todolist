import React, { useState } from "react";
import { Form, Button, Modal, Dropdown, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

function TodoModal(props) {
  const [newItem, setnewItem] = useState(props.todoitem);
  const { priorityObj,startDate,endDate} = props;
  const [startTodoDate, setStartTodoDate] = useState(startDate);
  const [endTodoDate, setEndTodoDate] = useState(endDate);
  

  const setDate = (value) => {
    console.log(value);
    setStartTodoDate(value.startDate);
    setEndTodoDate(value.endDate);
  };

  const getValue = (evt) => {
    setnewItem(evt.target.value);
  };

  const [priority, setPriority] = useState(props.priority);
  const disableSaveButton =
    newItem.length > 0 && priority.length > 0 && startTodoDate && endTodoDate;

  const priorityIcon = priority
    ? priorityObj.filter((obj) => {
        return obj.key === priority;
      })[0]
    : null;

  const Month = new Date().getMonth();
  const Year = new Date().getFullYear();
  const currrentDate = new Date().getDate();

  const leapYear =
    Year % 4 === 0 && Year % 400 === 0 && Year % 100 !== 0 ? true : false;

  const startValue = new Date(Year, Month, currrentDate);
  const endValue = new Date(Year, Month + 1, 15);

  const minDate = new Date(Year, Month, currrentDate);
  const maxDate = new Date(Year, Month + 2, 16);

  const saveTodo = (evt) => {
    props.addItem(newItem, priority, startTodoDate, endTodoDate);
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
          <Row>
            <Col>
              <Dropdown
                onSelect={(ekey, evt) => {
                  setPriority(ekey);
                }}
                required
              >
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                  Priority
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {priorityObj.map((obj, index) => {
                    return (
                      <Dropdown.Item
                        eventKey={obj.key}
                        key={`${obj.key}_${index}`}
                      >
                        <FontAwesomeIcon
                          icon={obj.icon}
                          style={{ color: obj.color }}
                        />{" "}
                        {obj.text}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              {priority ? (
                <FontAwesomeIcon
                  icon={priorityIcon["icon"]}
                  style={{ color: priorityIcon["color"] }}
                />
              ) : null}
            </Col>
            <Col>
              <DateRangePickerComponent
                placeholder="Enter Date Range"
                change={(val) => setDate(val)}
                value={[startTodoDate,endTodoDate]}
              ></DateRangePickerComponent>
            </Col>
          </Row>
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
