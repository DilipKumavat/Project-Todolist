import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import "./../styles/App.css";
import { useLocation } from "react-router-dom";
import { logout } from "../API/Auth";
import { Button, Container, Row, Col } from "react-bootstrap";
import { addTodo, deleteTodo, editTodo, fetchTodo } from "../API/ApiEndPoint";
import TodoModal from "./TodoModal";
import Pageindex from "./Pagination/pagination";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faFlag as faFlagR } from "@fortawesome/free-regular-svg-icons";
import Header from "./Navbar";

export default function TodoList(props) {
  const [itemArray, setItemArray] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [todoPerPage, settodoPerPage] = useState(2);
  const [modalShow, setModalShow] = useState(false);
  const [editSearch,seteditSearch] = useState(false);


  const indexOfLastTodo = currentPage * todoPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todoPerPage;
  const todos = itemArray.slice(indexOfFirstTodo, indexOfLastTodo);

  const Location = useLocation();

  const onsuccess = async () => {
    const getTodos = await fetchTodo();
    setItemArray(getTodos);
  };

  const additem = (value, priority) => {
    // setItemArray(addTodo(newItem, itemArray));
    addTodo(value, priority, onsuccess);
  };
  const deleteHandeler = (index) => {
    const idtoDelete = itemArray[index]._id;
    deleteTodo(idtoDelete, onsuccess);
    setcurrentPage(1);
  };
  const editHandeler = (editedval,priority,index) => {
    const idToEdit = itemArray[index]._id;
    editTodo(editedval,priority,idToEdit, onsuccess);
  };

  const setPage = (index) => setcurrentPage(index);

  useEffect(async () => {
    const getAllTodos = await fetchTodo();
    setItemArray(getAllTodos);
  }, [fetchTodo]);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const searchValue = (event) => setSearch(event.target.value);

  const findTodo = () => {
    const todos = itemArray.map((obj) => ({ id: obj._id, todoName: obj.task }));
    const found = todos.filter(
      (todo) => todo.todoName.includes(search) && todo
    );
    console.log(found);
    setResult(found);
    setTimeout(()=>clearSearch(),5*1000);
  };

  const clearSearch = () => {
    setSearch("");
    setResult([]);
  };

  const priorityObj = [
    { key: "P1", color: "maroon", text: "Priority 1", icon: faFlag },
    { key: "P2", color: "orange", text: "Priority 2", icon: faFlag },
    { key: "P3", color: "blue", text: "Priority 3", icon: faFlag },
    { key: "P4", color: "none", text: "Priority 4", icon: faFlagR },
  ];

  return (
    <Container fluid>
      <Header
        name={Location.state.name}
        findTodo={findTodo}
        searchValue={searchValue}
        logout={logout}
        result={result}
        clearSearch={clearSearch}
        search={search}
      />
      <Row className="justify-content-md-center my-5">
        <Col md={{ span: 6, offset: 0 }}>
          <Button variant="primary" onClick={() => setModalShow(true)} block>
            Add New Todo
          </Button>
          {modalShow ? (
            <TodoModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              addItem={additem}
              newItem=""
              priority=""
              priorityObj={priorityObj}
            />
          ) : null}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {todos.map((item, idx) => (
          <Col md={{ span: 9, offset: 3 }} key={idx}>
            <ListItem
              priority={
                priorityObj.filter((obj) => {
                  return obj.key === item.priority;
                })[0]
              }
              priorityObj={priorityObj}
              item={item}
              key={`${item}_${idx}`}
              idx={todoPerPage * (currentPage - 1) + (idx + 1)}
              editHandeler={editHandeler}
              deleteHandeler={deleteHandeler}
            />
          </Col>
        ))}
        {itemArray.length > todoPerPage && (
          <Pageindex
            todoPerPage={todoPerPage}
            pageSetup={setPage}
            totalTodos={itemArray.length}
            currentPage={currentPage}
          />
        )}
      </Row>
    </Container>
  );
}
