import React from "react";
import { Button, Form, Navbar, FormControl } from "react-bootstrap";
import "./navbar.css";

import { useHistory } from "react-router-dom";

const Header = (props) => {
  const History = useHistory();
  const { name, findTodo, searchValue, logout, result, clearSearch, search } =
    props;
  return (
    <Navbar
      className="justify-content-md-between"
      bg="light"
      className="navbar"
    >
      <Navbar.Brand>{name}</Navbar.Brand>

      <Form inline className="ml-auto">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={search}
          onChange={searchValue}
        />
        <Button variant="outline-success mr-4" onClick={findTodo}>
          Search
        </Button>
        {result.length > 0 ? (
          <div className="searchResult">
            <ul clasName="list">
              {result.map((val) => (
                <li onClick={clearSearch}>
                  {val.todoName}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Form>

      <Button className="mr-2" onClick={() => logout(History)}>
        Logout
      </Button>
    </Navbar>
  );
};

export default Header;
