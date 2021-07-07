import React, { useState,useEffect } from "react";
import "./../styles/App.css";
import { Card, Button, FloatingLabel, Form, CardColumns } from "react-bootstrap";

function ListItem(props) {
  
  const [editMode, seteditMode] = useState(false);
  const [editItem, setEditItem] = useState("");
  const openEditMode = () => {
    seteditMode(true);
  };
  const setBackItem = (evt) => {
    setEditItem(evt.target.value);
  };
  const saveNewItem = () => {
    props.editHandeler(editItem, props.idx);
    seteditMode(false);
  };

  useEffect(() => {
    setEditItem(props.item.task);
  }, [props.item.task])

  return (
    <div className="list">
      {editMode ? (
        
        <CardColumns>
          <Card className="w-100">
            <Card.Header as="h5">Task count : {props.idx +1}</Card.Header>
            <Card.Body className="w-100">
              <Card.Title>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  onChange={setBackItem}
                  value={editItem}
                >
                  {editItem}
                </Form.Control>
              </Card.Title>
              <Button
                variant="primary"
                size="sm"
                onClick={saveNewItem}
            disabled={editItem.trim().length === 0}
              >
                Save Task
              </Button>
           
            </Card.Body>
        
          </Card>
          </CardColumns>
      ) : (
        <CardColumns>
          <Card  className="mb-3 w-100">
            <Card.Header as="h5">Task count : {props.idx + 1}</Card.Header>
            <Card.Body className="w-100">
              <Card.Title>{props.item.task}</Card.Title>
              <Button variant="primary" size="sm" onClick={openEditMode}>
                Edit Task
              </Button>
              <Button
                variant="primary"
                size="sm"
                className = "ml-3"
                onClick={() => props.deleteHandeler(props.idx)}
              >
                Delete Task
              </Button>
            </Card.Body>
          </Card>
          </CardColumns>
      )}
    </div>
  );
}

export default ListItem;
