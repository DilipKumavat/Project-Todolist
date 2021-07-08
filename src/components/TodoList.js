import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import "./../styles/App.css";
import { useLocation, useHistory } from "react-router-dom";
import { logout } from "../API/Auth";
import { Button, Container, Form, Row, Col, Navbar } from "react-bootstrap";
import { addTodo, deleteTodo, editTodo, fetchTodo } from "../API/ApiEndPoint";

export default function TodoList(props) {
  const [itemArray, setItemArray] = useState([]);
  const [newItem, setnewItem] = useState("");
  const [err, setErr] = useState("");

  const Location = useLocation();
  const History = useHistory();

  const getValue = (evt) => {
    setnewItem(evt.target.value);
  };

  const onsuccess = async () => {
    const getTodos = await fetchTodo();
    setItemArray(getTodos);
  };

  const onerror = async () => {};

  const addItem = () => {
    // setItemArray(addTodo(newItem, itemArray));
    addTodo(newItem, onsuccess);
    setnewItem("");
  };
  const deleteHandeler = (index) => {
    const idtoDelete = itemArray[index]._id;
    deleteTodo(idtoDelete, onsuccess);
  };
  const editHandeler = (editedval, index) => {
    const idToEdit = itemArray[index]._id;
    editTodo(editedval, idToEdit, onsuccess);
  };

  useEffect(async () => {
    const getAllTodos = await fetchTodo();

    setItemArray(getAllTodos);
  }, [fetchTodo]);

  return (
    <Container>
      <Navbar className="justify-content-md-between" bg="light">
        <Navbar.Brand>{Location.state.name}</Navbar.Brand>
        <Button className="mr-2" onClick={() => logout(History)}>
          Logout
        </Button>
      </Navbar>
      <Row className="justify-content-md-center my-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Control
            as="textarea"
            id="task"
            onChange={getValue}
            value={newItem}
            placeholder="Add New Todo"
          />
        </Col>
        <Col>
          <Button
            id="btn"
            onClick={addItem}
            disabled={newItem.trim().length === 0}
          >
            Add
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {itemArray.map((item, idx) => (
          <Col md={{ span: 9, offset: 3 }}>
            <ListItem
              item={item}
              key={`${item}_${idx}`}
              idx={idx}
              editHandeler={editHandeler}
              deleteHandeler={deleteHandeler}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
