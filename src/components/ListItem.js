import React, { useState, useEffect } from "react";
import "./../styles/App.css";
import { Card, Button, Form, CardColumns } from "react-bootstrap";
import DeleteModal from "./DeleteModal/deletemodal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TodoModal from "./TodoModal";
function ListItem(props) {
  const [editMode, seteditMode] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [callModal, setcallModal] = useState(false);
  const hideModal = () => {
    setcallModal(false);
  };
  const openEditMode = () => {
    seteditMode(true);
  };
  const setBackItem = (evt) => {
    setEditItem(evt.target.value);
  };
  const saveNewItem = (value,priority) => {
    props.editHandeler(value,priority,props.idx-1);
    seteditMode(false);
  };

  const deleteTodo = (idx) => props.deleteHandeler(idx - 1);

  useEffect(() => {
    setEditItem(props.item.task);
  }, [props.item.task]);

  return (
    <div className="list">
      {editMode ? (
        <TodoModal
        show={editMode}
        onHide={() => seteditMode(false)}
        addItem={saveNewItem}
        newItem={props.item.task}
        priority={props.priority.key}
        priorityObj={props.priorityObj}
        />
      ) : (
        <CardColumns>
          <Card className="mb-3 w-100">
            <Card.Header as="h5">
              Task count : {props.idx}{" "}
              {
                <FontAwesomeIcon
                  icon={props.priority.icon}
                  style={{ color: props.priority.color }}
                />
              }
            </Card.Header>
            <Card.Body className="w-100">
              <Card.Title>{props.item.task}</Card.Title>
              <Button variant="primary" size="sm" onClick={openEditMode}>
                Edit Task
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="ml-3"
                onClick={() => setcallModal(true)}
              >
                Delete Task
              </Button>
              {callModal ? (
                <DeleteModal
                  showModal={true}
                  deleteTodo={deleteTodo}
                  hide={hideModal}
                  todoId={props.idx}
                />
              ) : null}
            </Card.Body>
          </Card>
        </CardColumns>
      )}
    </div>
  );
}

export default ListItem;
