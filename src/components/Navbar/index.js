import React from "react";
import { Button, Form, Navbar, FormControl, Nav } from "react-bootstrap";
import "./navbar.css";

import { useHistory } from "react-router-dom";

const Header = (props) => {
  const History = useHistory();
  const { name, findTodo, searchValue, logout, result, clearSearch, search } =
    props;
  return (
    <Navbar
      className="navbar md:justify-content-between"
      bg="light"
      expand="md"
    >
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Brand>{name}</Navbar.Brand>
      <Navbar.Collapse id="navbarScroll" className="justify-content-end">
        <Nav navbarScroll>
          <Form inline className="d-flex flex-row justify-content-start">
            <FormControl
              type="text"
              placeholder="Search"
              className="w-50 md:w-100 my-2 md:my-0"
              value={search}
              onChange={searchValue}
            />
            <Button
              variant="outline-success w-25 md:w-50 ml-4"
              onClick={findTodo}
            >
              Search
            </Button>
            {result.length > 0 ? (
              <div className="searchResult">
                <ul clasName="list">
                  {result.map((val) => (
                    <li onClick={() => clearSearch(val.idx)}>{val.todoName}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Form>

          <Button className="mx-2 md:w-100" onClick={() => logout(History)}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
