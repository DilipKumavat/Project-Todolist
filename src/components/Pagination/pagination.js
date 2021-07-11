import React from "react";
import { Pagination } from "react-bootstrap";


const Pageindex = (props) => {
  const { todoPerPage, totalTodos, pageSetup, currentPage } = props;
  const pageNumbers = [];

  

  for (let i = 1; i <= Math.ceil(totalTodos / todoPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map((number) => (
        <Pagination.Item
          active={number === currentPage}
          onClick={() => pageSetup(number)}
        >
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Pageindex;
